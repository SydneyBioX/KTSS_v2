import React from 'react'
import { 
    Button,
    Popover,
    PopoverContent,
    PopoverHandler
     } from "@material-tailwind/react";

const InstructionPopover = () => {
  return (
    <Popover>
            <PopoverHandler>
                <Button>Instructions</Button>
            </PopoverHandler>
            <PopoverContent>
                Instructions on how to use the app
            </PopoverContent>
            </Popover>
  )
}

export default InstructionPopover