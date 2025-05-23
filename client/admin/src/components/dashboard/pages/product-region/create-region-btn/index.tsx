import { useState, type FC } from "react";

// react icons
import { FaPlus } from "react-icons/fa6";

// shadcn components
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/library/shadcn-components/ui/sheet";

// DRY
import CustomButton from "@/components/library/custom-button";

// hooks
import { useTailwindBreakpoint } from "@/hooks/use-tailwind-breakpoint";

// types
import type { CreateRegionButtonProps } from "@/types";

// Create Region Tag Form
import CreateRegionPage from "../new";

const CreateRegionButton: FC<CreateRegionButtonProps> = ({ fetchRegionTag }) => {
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  const isMobile = !useTailwindBreakpoint("sm");

  const sheetSide = isMobile ? "bottom" : "right";

  const handleSheet = () => setOpenSheet(!openSheet);

  return (
    <Sheet open={openSheet} onOpenChange={handleSheet}>
      <SheetTrigger asChild>
        <CustomButton btnLabel="add product region" btnSize="md" icon={FaPlus} iconPlacement="start" />
      </SheetTrigger>

      <SheetContent side={sheetSide}>
        <SheetHeader>
          <SheetTitle>Create Region Tag</SheetTitle>
          <SheetDescription>Create tags to define product regions or traditional styles.</SheetDescription>
        </SheetHeader>

        <CreateRegionPage setOpenSheet={setOpenSheet} fetchRegionTag={fetchRegionTag} />
      </SheetContent>
    </Sheet>
  );
};

export default CreateRegionButton;
