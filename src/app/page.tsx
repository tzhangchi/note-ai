import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Editor />
    </div>
  );
}
