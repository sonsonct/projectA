import { Button } from "@/components/ui/button"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <nav className="flex items-center justify-center space-x-2" aria-label="Pagination">
            <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, index) => (
                    <Button
                        key={index + 1}
                        variant={currentPage === index + 1 ? "default" : "outline"}
                        size="icon"
                        className={`w-8 h-8 ${currentPage === index + 1
                            ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                            : "bg-zinc-800 border-zinc-700 hover:bg-cyan-700 text-zinc-400"
                            } transition-colors`}
                        onClick={() => { onPageChange(index + 1) }}
                        aria-label={`Go to page ${index + 1}`}
                        aria-current={currentPage === index + 1 ? "page" : undefined}
                    >
                        <span className="text-sm">{index + 1}</span>
                    </Button>
                ))}
            </div>
        </nav>
    )
}

