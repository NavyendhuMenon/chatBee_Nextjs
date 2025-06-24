import { NextRequest } from "next/server";

import ioHandler from "@/server/socket";

export async function GET (req:NextRequest) {


    return new Response ("Socket initialized")
    
}