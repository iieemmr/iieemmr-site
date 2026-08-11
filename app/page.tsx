import HeroRecap from "@/components/HeroRecap";
import EventDetails from "@/components/EventDetails";
import VideoHighlight from "@/components/VideoHighlight";
import SponsorThankYou from "@/components/SponsorThankYou";
import MMRHistoryVideo from "@/components/MMRHistoryVideo";
import PhotoGallery from "@/components/PhotoGallery";

export default function Home() {
  return (
    <main id="main-content">
      <HeroRecap />
      <EventDetails />
      <VideoHighlight />
      <SponsorThankYou />
      <MMRHistoryVideo />
      <PhotoGallery />
    </main>
  );
}
