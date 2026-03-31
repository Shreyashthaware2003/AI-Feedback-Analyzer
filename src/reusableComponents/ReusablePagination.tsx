"use client";

type PaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({
    page,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const handlePrev = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    return (
        <div className="flex items-center justify-center mt-4 gap-4">
            {/* Prev Button */}
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-3 py-1 rounded-md border disabled:opacity-50 text-xs cursor-pointer"
            >
                Prev
            </button>

            {/* Page Info */}
            <p className="text-xs text-muted-foreground">
                Page <span className="font-medium">{page}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
            </p>

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-md border disabled:opacity-50 text-xs cursor-pointer"
            >
                Next
            </button>
        </div>
    );
}