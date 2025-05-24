import { useId, type FC } from "react";

// TanStack Table
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

// Lucide React Icons
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/library/shadcn-components/ui/button";
import { Label } from "@/components/library/shadcn-components/ui/label";
import { Pagination, PaginationContent, PaginationItem } from "@/components/library/shadcn-components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/library/shadcn-components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/library/shadcn-components/ui/table";

// types
import type { ProdReviewListTableProps, ProductReviewsRespProps } from "@/types";

const ProdReviewsListTable: FC<ProdReviewListTableProps> = props => {
  const { onPageChange, onRowsPerPageChange, pageNo, reviewsData, rowsPerPage, totalSize } = props;

  const reactId = useId();

  const columns: ColumnDef<ProductReviewsRespProps>[] = [
    {
      id: "ratingStar",
      header: () => <span className="font-della-respira">Star Rating</span>,
      accessorKey: "ratingStar",
      cell: ({ row }) => <p className="font-della-respira">{row.getValue("ratingStar")}</p>,
      size: 50,
    },
    {
      id: "ratingComment",
      header: () => <span className="font-della-respira">Comment</span>,
      accessorKey: "ratingComment",
      cell: ({ row }) => <p className="font-della-respira">{row.getValue("ratingComment")}</p>,
      size: 250,
    },
    {
      id: "productDetailsFk.productName",
      header: () => <span className="font-della-respira">Product Name</span>,
      accessorKey: "productDetailsFk.productName",
      cell: ({ row }) => <p className="font-della-respira">{row.getValue("productDetailsFk.productName")}</p>,
      size: 150,
    },
    {
      id: "customerDetailsFk",
      header: () => <span className="font-della-respira">Review By</span>,
      accessorKey: "customerDetailsFk",
      cell: ({ row }) => <p className="font-della-respira">{`${row.original.customerDetailsFk.firstName} ${row.original.customerDetailsFk.lastName}`}</p>,
      size: 100,
    },
  ];

  const table = useReactTable({
    data: reviewsData,
    columns,
    pageCount: Math.ceil(totalSize / rowsPerPage),
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: totalSize,
    state: {
      pagination: {
        pageIndex: pageNo,
        pageSize: rowsPerPage,
      },
    },
    onPaginationChange: updater => {
      const newPagination = typeof updater === "function" ? updater({ pageIndex: pageNo, pageSize: rowsPerPage }) : updater;

      onPageChange(newPagination.pageIndex);
      onRowsPerPageChange(newPagination.pageSize);
    },
  });

  return (
    <div className="space-y-4">
      <div className="bg-background overflow-hidden rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => {
              return (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id} style={{ width: `${header.getSize()}px` }} className="h-11">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => {
                return (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map(cell => {
                      return <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>;
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-8">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <Label htmlFor={reactId} className="max-sm:sr-only">
            Rows per page
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={value => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger id={reactId} className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              {[5, 10, 25, 50, 100].map(pageSize => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Page number information */}
        <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
          <p className="text-muted-foreground text-sm whitespace-nowrap" aria-live="polite">
            <span className="text-foreground">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
              {Math.min(Math.max(table.getState().pagination.pageIndex * table.getState().pagination.pageSize + table.getState().pagination.pageSize, 0), table.getRowCount())}
            </span>{" "}
            of <span className="text-foreground">{table.getRowCount().toString()}</span>
          </p>
        </div>
        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeftIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>

              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRightIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ProdReviewsListTable;
