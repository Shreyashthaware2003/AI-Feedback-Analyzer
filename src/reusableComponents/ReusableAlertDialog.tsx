"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    button1?: string;
    button2?: string;
    onConfirm?: () => void;
}

export function ReusableAlertDialog({
    open,
    onOpenChange,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    button1 = "Cancel",
    button2 = "Continue",
    onConfirm,
}: AlertDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-white sm:max-w-xs">
                <AlertDialogHeader>
                    <AlertDialogTitle className=" w-full text-center">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-center w-full">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex items-center md:justify-center">
                    <AlertDialogCancel className="capitalize sm:text-xs flex-1 cursor-pointer">
                        {button1}
                    </AlertDialogCancel>

                    <AlertDialogAction
                        className="capitalize text-xs sm:flex-1 cursor-pointer"
                        onClick={onConfirm}
                    >
                        {button2}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}