import PhotoLightbox from "@/components/shared/PhotoLightbox";
import { galleryPhotos } from "@/data/gallery";

export default function PhotoGallery() {
  return (
    <section className="bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <h2 className="text-center font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
          Photo Gallery
        </h2>
        <PhotoLightbox photos={galleryPhotos} />
      </div>
    </section>
  );
}
