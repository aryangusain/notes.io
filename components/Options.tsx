import { cn } from "@/lib/utils";
import { useTabState } from "@/store/store"
import { IconDownload } from "@tabler/icons-react"

const Options = () => {
  const activeTab = useTabState((state) => state.active);
  const setActiveTab = useTabState((state) => state.setState);

  return (
    <div className="py-2 px-4 bg-neutral-800 flex justify-between items-center ">
        <div className="flex bg-neutral-600 rounded-xl overflow-hidden shadow-xl">
            <button onClick={() => setActiveTab("edit")} className={cn("z-10 py-2 px-3 md:text-sm text-xs bg-neutral-600 rounded-xl border border-neutral-600  hover:bg-neutral-700 cursor-pointer", (activeTab === "edit") && "bg-neutral-800 hover:bg-neutral-800")}>Edit</button>
            <button onClick={() => setActiveTab("preview")} className={cn("z-10 py-2 px-3 md:text-sm text-xs bg-neutral-600 rounded-xl border border-neutral-600 hover:bg-neutral-700 cursor-pointer", (activeTab === "preview") && "bg-neutral-800 hover:bg-neutral-800")}>Preview</button>
        </div>
    </div>
  )
}
export default Options