"use client"

import Edit from "@/components/Edit"
import Preview from "@/components/Preview"
import { usePreviewStore } from "@/store/store";

const page = () => {
  const previewOpen = usePreviewStore((state) => state.open);

  return (   
    <div className="flex items-center justify-center mt-[20px] w-full">
      <div className="md:w-[600px] w-full h-[650px] relative shadow-xl">
        <Edit />
        {previewOpen && <Preview />}
      </div>
    </div>
  )
}
export default page