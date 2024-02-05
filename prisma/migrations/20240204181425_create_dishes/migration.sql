-- CreateTable
CREATE TABLE "Dishes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "Dishes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dishes" ADD CONSTRAINT "Dishes_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
