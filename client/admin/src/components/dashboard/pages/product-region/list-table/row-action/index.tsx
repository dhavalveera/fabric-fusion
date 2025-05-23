import { useState, type FC } from "react";

// Formik + Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// SONNER => toast
import { toast } from "sonner";

// Lucide React Icon
import { CircleAlertIcon, EditIcon, EyeIcon, Trash2Icon } from "lucide-react";

// API
import { deleteProductRegionApi } from "@/api/product-region-api";

// DRY
import DescriptionList from "@/components/library/description-list";
import DescriptionListItem from "@/components/library/description-list/item";

// shadcn components
import { Button } from "@/components/library/shadcn-components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/library/shadcn-components/ui/dialog";
import { Label } from "@/components/library/shadcn-components/ui/label";
import { Input } from "@/components/library/shadcn-components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/library/shadcn-components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/library/shadcn-components/ui/tooltip";

// hooks
import { useTailwindBreakpoint } from "@/hooks/use-tailwind-breakpoint";

// types
import { RegionTagTableActionProps } from "@/types";

// Edit Form
import EditRegionTagForm from "../../edit";

const RegionTagTableRowAction: FC<RegionTagTableActionProps> = ({ fetchRegionTag, row }) => {
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const isMobile = !useTailwindBreakpoint("sm");

  const sheetSide = isMobile ? "bottom" : "right";

  const handleSheet = () => setOpenSheet(!openSheet);
  const handleDialog = () => setOpenDialog(!openDialog);
  const handleDeleteDialog = () => setOpenDeleteDialog(!openDeleteDialog);

  const formik = useFormik({
    initialValues: {
      regionName: "",
    },
    validationSchema: Yup.object({
      regionName: Yup.string().required("Region Name is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);

        if (row.original.regionTagName === values.regionName) {
          toast.promise(deleteProductRegionApi(row.original.productRegionTagId), {
            loading: "Deleting Region Tag...",
            success: response => {
              if (response && response?.statusCode === 200) {
                fetchRegionTag?.();

                helpers.resetForm();

                return (
                  <div>
                    <div className="font-della-respira font-medium">Region Tag Deleted successfully!</div>
                    <div className="text-muted-foreground font-della-respira text-sm">Region Tag</div>
                  </div>
                );
              }
            },
            error: "Error while deleting Region Tag!.",
          });
        } else {
          helpers.setFieldError("regionName", "Please enter correct Region Tag Name to Delete.");
        }
      } catch (error) {
        console.log("🚀 --------------------------------------------🚀");
        console.log("🚀 ~ index.tsx:57 ~ onSubmit: ~ error:", error);
        console.log("🚀 --------------------------------------------🚀");

        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="flex">
        {/* View Dialog */}
        <Dialog open={openDialog} onOpenChange={handleDialog}>
          <DialogTrigger asChild>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="cursor-pointer shadow-none" aria-label="View Region Tag Item" onClick={handleDialog}>
                    <EyeIcon focusable="false" aria-hidden="true" size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>

          <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
            <DialogHeader className="contents space-y-0 text-left">
              <DialogTitle className="border-b px-6 py-4 text-base">View Region Tag</DialogTitle>
            </DialogHeader>
            <DialogDescription className="sr-only">View Region Tag Details more preciously!.</DialogDescription>

            <div className="overflow-y-auto px-5 py-2">
              <DescriptionList>
                <DescriptionListItem title="Region Tag Name">{row.original.regionTagName}</DescriptionListItem>

                <DescriptionListItem title="Region Tag Description">{row.original.regionTagDescription}</DescriptionListItem>
              </DescriptionList>
            </div>

            <DialogFooter className="border-t px-6 py-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={() => {
                  handleDialog();
                  handleSheet();
                }}
              >
                Edit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet open={openSheet} onOpenChange={handleSheet}>
          <SheetTrigger asChild>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="cursor-pointer shadow-none" aria-label="Edit Region Tag Item" onClick={handleSheet}>
                    <EditIcon focusable="false" aria-hidden="true" size={16} />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Edit</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SheetTrigger>

          <SheetContent side={sheetSide}>
            <SheetHeader>
              <SheetTitle>Edit Region Tag</SheetTitle>
              <SheetDescription>Edit tags to define product regions or traditional styles.</SheetDescription>
            </SheetHeader>

            <EditRegionTagForm
              setOpenSheet={setOpenSheet}
              regionTagDescription={row.original.regionTagDescription}
              regionTagId={row.original.productRegionTagId}
              regionTagName={row.original.regionTagName}
            />
          </SheetContent>
        </Sheet>

        <Dialog open={openDeleteDialog} onOpenChange={handleDeleteDialog}>
          <DialogTrigger asChild>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="cursor-pointer shadow-none" aria-label="Delete Region Tag Item" onClick={handleDeleteDialog}>
                    <Trash2Icon focusable="false" aria-hidden="true" size={16} />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>

          <DialogContent className="flex flex-col gap-0 overflow-y-visible p-4 sm:max-w-lg [&>button:last-child]:top-3.5">
            <div className="flex flex-col items-center gap-2">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
                <CircleAlertIcon className="opacity-80" size={16} />
              </div>
              <DialogHeader>
                <DialogTitle className="font-della-respira sm:text-center">Final confirmation</DialogTitle>
                <DialogDescription className="font-della-respira sm:text-center">
                  This action cannot be undone. To confirm, please enter the region tag name <span className="text-foreground font-bold underline">{row.original.regionTagName}</span>.
                </DialogDescription>
              </DialogHeader>
            </div>

            <form onSubmit={formik.handleSubmit} className="mt-4 space-y-5">
              <div className="*:not-first:mt-2">
                <Label htmlFor="regionName" className="font-della-respira">
                  Region Tag Name
                </Label>
                <Input
                  id="regionName"
                  name="regionName"
                  type="text"
                  placeholder={`Type ${row.original.regionTagName} to confirm`}
                  value={formik.values.regionName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.regionName && formik.errors.regionName ? <p className="font-della-respira mt-2 font-semibold text-red-600">{formik.errors.regionName}</p> : null}
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type={formik.isSubmitting ? "button" : "submit"} className="flex-1" disabled={formik.values.regionName !== row.original.regionTagName}>
                  {formik.isSubmitting ? "Deleting...." : "Delete"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default RegionTagTableRowAction;
