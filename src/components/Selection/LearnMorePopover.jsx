import React from 'react'
import { 
    Button,
    Popover,
    PopoverContent,
    PopoverHandler
     } from "@material-tailwind/react";

const LearnMorePopover = () => {
  return (
    <Popover>
            <PopoverHandler>
                <Button>Learn More</Button>
            </PopoverHandler>
            <PopoverContent>
                Learn More about simKAP
            </PopoverContent>
            </Popover>
  )
}

export default LearnMorePopover