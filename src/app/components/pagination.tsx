import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const canGoPrevious = currentPage > 1
    const canGoNext = currentPage < totalPages

    return (
        <nav className="flex items-center justify-center space-x-2" aria-label="Pagination">
            <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 transition-colors"
                onClick={() => onPageChange(1)}
                disabled={!canGoPrevious}
                aria-label="Go to first page"
            >
                <ChevronsLeft className="h-4 w-4 text-zinc-400" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 transition-colors"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!canGoPrevious}
                aria-label="Go to previous page"
            >
                <ChevronLeft className="h-4 w-4 text-zinc-400" />
            </Button>
            <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, index) => (
                    <Button
                        key={index + 1}
                        variant={currentPage === index + 1 ? "default" : "outline"}
                        size="icon"
                        className={`w-8 h-8 ${currentPage === index + 1
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-400"
                            } transition-colors`}
                        onClick={() => onPageChange(index + 1)}
                        aria-label={`Go to page ${index + 1}`}
                        aria-current={currentPage === index + 1 ? "page" : undefined}
                    >
                        <span className="text-sm">{index + 1}</span>
                    </Button>
                ))}
            </div>
            <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 transition-colors"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!canGoNext}
                aria-label="Go to next page"
            >
                <ChevronRight className="h-4 w-4 text-zinc-400" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 transition-colors"
                onClick={() => onPageChange(totalPages)}
                disabled={!canGoNext}
                aria-label="Go to last page"
            >
                <ChevronsRight className="h-4 w-4 text-zinc-400" />
            </Button>
        </nav>
    )
}

