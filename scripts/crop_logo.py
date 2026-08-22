"""
Crop a sponsor logo out of a full conference banner image.
Handles two cases automatically:
  1. Logo sits on a solid white card in the banner -> detect white region, crop tight, pad onto fresh white canvas.
  2. Logo sits directly on the photo background (no white card) -> detect ink/color pixels, crop tight, pad onto white canvas.

Usage:
    python crop_logo.py path/to/banner.jpg path/to/output_logo.png
"""

import sys
import numpy as np
from PIL import Image
from scipy import ndimage


def try_white_card(arr, h, w, min_area_frac=0.01):
    white_mask = np.all(arr >= 254, axis=2)
    labeled, num = ndimage.label(white_mask)
    if num == 0:
        return None
    sizes = ndimage.sum(white_mask, labeled, range(1, num + 1))
    candidates = []
    for i in range(1, num + 1):
        size = sizes[i - 1]
        if size < min_area_frac * h * w:
            continue
        ys, xs = np.where(labeled == i)
        y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
        box_w, box_h = x1 - x0, y1 - y0
        fill_ratio = size / (box_w * box_h + 1)
        cy = (y0 + y1) / 2 / h
        if fill_ratio > 0.15 and 0.15 < cy < 0.95:
            candidates.append((size, y0, y1, x0, x1))
    if not candidates:
        return None
    candidates.sort(key=lambda c: -c[0])
    _, y0, y1, x0, x1 = candidates[0]
    return y0, y1, x0, x1


def try_logo_pixels(arr, h, w):
    y_lo, y_hi = int(h * 0.15), int(h * 0.90)
    x_lo, x_hi = int(w * 0.05), int(w * 0.95)
    region = arr[y_lo:y_hi, x_lo:x_hi]
    r, g, b = region[:, :, 0].astype(int), region[:, :, 1].astype(int), region[:, :, 2].astype(int)
    brightness = (r + g + b) / 3
    sat = np.max(region, axis=2).astype(int) - np.min(region, axis=2).astype(int)
    mask = (brightness < 90) | (sat > 45)
    ys, xs = np.where(mask)
    if len(ys) < 500:
        return None
    y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    return y0 + y_lo, y1 + y_lo, x0 + x_lo, x1 + x_lo


def crop_logo(path, out_path, pad=80):
    im = Image.open(path).convert("RGB")
    arr = np.array(im)
    h, w, _ = arr.shape

    box = try_white_card(arr, h, w)
    method = "white_card"
    if box is None:
        box = try_logo_pixels(arr, h, w)
        method = "logo_pixels (no white card found - may need manual review)"
    if box is None:
        print(f"{path}: FAILED to find logo — needs manual crop")
        return False

    y0, y1, x0, x1 = box
    crop = im.crop((x0, y0, x1, y1))
    cw, ch = crop.size
    canvas = Image.new("RGB", (cw + 2 * pad, ch + 2 * pad), (255, 255, 255))
    canvas.paste(crop, (pad, pad))
    canvas.save(out_path)
    print(f"{path}: method={method} -> saved {out_path} ({canvas.size})")
    return True


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python crop_logo.py <input_banner.jpg> <output_logo.png>")
        sys.exit(1)
    crop_logo(sys.argv[1], sys.argv[2])
