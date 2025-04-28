"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const GenerateProgram = () => {
  const { user } = useUser();
  console.log("user", user?.imageUrl);
  return (
    <div className="container mx-auto pt-4">
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent>
            <div className="flex flex-col gap-4 items-center">
              <Image src="/robot-image.png" height={300} width={300} alt="AI" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur, doloremque.
              </p>
              <div className="flex gap-4">
                <Button>Generate your program</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-4 items-center">
              {user?.imageUrl && (
                <Avatar
                  className="h-[300px] w-[300px]"
                />
              )}

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur, doloremque.
              </p>
              <div className="flex gap-4">
                <Button>Generate your program</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerateProgram;
