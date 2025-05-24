import { useState, type FC } from "react";

// Lucide React Icon
import { EditIcon, EyeIcon } from "lucide-react";

// DRY
import Badge from "@/components/library/badge";
import DescriptionList from "@/components/library/description-list";
import DescriptionListItem from "@/components/library/description-list/item";

// shadcn components
import { Button } from "@/components/library/shadcn-components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/library/shadcn-components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/library/shadcn-components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/library/shadcn-components/ui/tooltip";

// hooks
import { useTailwindBreakpoint } from "@/hooks/use-tailwind-breakpoint";

// types
import type { ReportedReviewTableActionProps } from "@/types";

// Edit Form
import ReportedReviewEditForm from "./edit-form";

const ReportedReviewTableAction: FC<ReportedReviewTableActionProps> = props => {
  const { fetchReportedReviews, row } = props;

  const [openEditFormSheet, setOpenEditFormSheet] = useState<boolean>(false);
  const [openReadDialog, setOpenReadDialog] = useState<boolean>(false);

  const isMobile = !useTailwindBreakpoint("sm");

  const sheetSide = isMobile ? "bottom" : "right";

  const handleEditFormSheet = () => setOpenEditFormSheet(!openEditFormSheet);
  const handleReadDialog = () => setOpenReadDialog(!openReadDialog);

  return (
    <>
      <div className="flex">
        {/* View Review Dialog Model */}
        <Dialog open={openReadDialog} onOpenChange={handleReadDialog}>
          <DialogTrigger asChild>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="cursor-pointer shadow-none" aria-label="View Region Tag Item" onClick={handleReadDialog}>
                    <EyeIcon focusable="false" aria-hidden="true" size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>

          <DialogContent className="flex flex-col gap-0 p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
            <DialogHeader className="contents space-y-0 text-left">
              <DialogTitle className="border-b px-6 py-4 text-base">View Reported Review</DialogTitle>
            </DialogHeader>
            <DialogDescription asChild>
              <div className="overflow-y-auto px-5 py-2">
                <DescriptionList>
                  <DescriptionListItem title="Star Rating">{row.original.productReviewFk.ratingStar}</DescriptionListItem>

                  <DescriptionListItem title="Rating Comment">{row.original.productReviewFk.ratingComment}</DescriptionListItem>

                  <DescriptionListItem title="Product Name">{row.original.productReviewFk.productDetailsFk.productName}</DescriptionListItem>

                  <DescriptionListItem title="Review Given By">
                    {row.original.productReviewFk.customerDetailsFk.firstName} {row.original.productReviewFk.customerDetailsFk.lastName}
                  </DescriptionListItem>

                  <DescriptionListItem title="Reason of Reporting">{row.original.reason}</DescriptionListItem>

                  <DescriptionListItem title="Review Reported By">
                    {row.original.reportedByUserId.firstName} {row.original.reportedByUserId.lastName}
                  </DescriptionListItem>

                  <DescriptionListItem title="Review Status">
                    {(() => {
                      switch (row.original.reportStatus) {
                        case "Pending":
                          return <Badge label="Pending" type="warning" variant="outlined" />;
                        case "Reviewed":
                          return <Badge label="Pending" type="info" variant="outlined" />;
                        case "Action Taken":
                          return <Badge label="Action Taken" type="success" variant="outlined" />;
                      }
                    })()}
                  </DescriptionListItem>
                </DescriptionList>
              </div>
            </DialogDescription>

            <DialogFooter className="border-t px-6 py-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={() => {
                  handleReadDialog();
                  handleEditFormSheet();
                }}
              >
                Edit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Form Sheet (Drawer) */}
        <Sheet open={openEditFormSheet} onOpenChange={handleEditFormSheet}>
          <SheetTrigger asChild>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="cursor-pointer shadow-none" aria-label="Edit Region Tag Item" onClick={handleEditFormSheet}>
                    <EditIcon focusable="false" aria-hidden="true" size={16} />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Edit</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SheetTrigger>

          <SheetContent side={sheetSide}>
            <SheetHeader>
              <SheetTitle>Update Reported Review</SheetTitle>
              <SheetDescription>Manage and update this review flagged by a user.</SheetDescription>
            </SheetHeader>

            <div>
              <ReportedReviewEditForm
                currentStatus={row.original.reportStatus}
                fetchReportedReviews={fetchReportedReviews}
                reportedReviewId={row.original.reviewsReportedId}
                handleEditFormSheet={handleEditFormSheet}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ReportedReviewTableAction;
