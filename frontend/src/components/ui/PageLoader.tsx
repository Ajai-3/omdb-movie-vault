import { Loader2 } from "lucide-react";

const PageLoader = () => (
  <div className='min-h-[60vh] flex items-center justify-center'>
    <Loader2 className='w-12 h-12 text-[#ABFF00] animate-spin' />
  </div>
);

export default PageLoader
