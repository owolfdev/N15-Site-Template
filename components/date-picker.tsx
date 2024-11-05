"use client";
import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const DatePickerField = ({ field }: { field: any }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] pl-3 text-left font-normal input-no-zoom text-lg sm:text-sm border-border dark:border-white dark:border-opacity-70 placeholder-gray-500 dark:placeholder-white dark:placeholder-opacity-50 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          //   disabled={(date) =>
          //     date > new Date() || date < new Date("1900-01-01")
          //   }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerField;
