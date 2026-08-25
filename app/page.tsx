import HeroRecap from "@/components/HeroRecap";
import BeforeAfterHighlight from "@/components/BeforeAfterHighlight";
import EventDetails from "@/components/EventDetails";
import VideoHighlight from "@/components/VideoHighlight";
import SponsorHighlight from "@/components/SponsorHighlight";
import MMRHistoryVideo from "@/components/MMRHistoryVideo";
import PhotoGallery from "@/components/PhotoGallery";

export default function Home() {
  return (
    <main id="main-content">
      <HeroRecap />
      <BeforeAfterHighlight />
      <EventDetails />
      <SponsorHighlight />
      <VideoHighlight />
      <MMRHistoryVideo />
      <PhotoGallery />
    </main>
  );
}
