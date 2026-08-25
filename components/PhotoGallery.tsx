import AlbumGrid from "@/components/shared/AlbumGrid";
import ShareButton from "@/components/shared/ShareButton";
import { galleryAlbums } from "@/data/gallery";

export default function PhotoGallery() {
  return (
    <section id="gallery" className="bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
            Photo Gallery
          </h2>
          <ShareButton
            title="12th MMRC Recap"
            text="A recap of the 12th IIEE Metro Manila Regional Conference — Brighter 2026."
          />
        </div>
        <AlbumGrid albums={galleryAlbums} />
      </div>
    </section>
  );
}
