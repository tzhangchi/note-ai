import Image from "next/image";
import PostEditorPage from "./pages/check";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <PostEditorPage />
      {/* <Editor /> */}
    </div>
  );
}
