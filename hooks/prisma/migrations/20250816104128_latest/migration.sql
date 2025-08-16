/*
  Warnings:

  - The primary key for the `Zap` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `zid` on the `Zap` table. All the data in the column will be lost.
  - You are about to drop the `Actions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvailableActions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `AvailableTrigger` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Zap` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `Zap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metadata` to the `ZapRun` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Actions" DROP CONSTRAINT "Actions_actionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Actions" DROP CONSTRAINT "Actions_zapId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trigger" DROP CONSTRAINT "Trigger_zapId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ZapRun" DROP CONSTRAINT "ZapRun_zapId_fkey";

-- DropIndex
DROP INDEX "public"."Trigger_triggerId_key";

-- AlterTable
ALTER TABLE "public"."AvailableTrigger" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Trigger" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "public"."Zap" DROP CONSTRAINT "Zap_pkey",
DROP COLUMN "zid",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Zap_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."ZapRun" ADD COLUMN     "metadata" JSONB NOT NULL;

-- DropTable
DROP TABLE "public"."Actions";

-- DropTable
DROP TABLE "public"."AvailableActions";

-- CreateTable
CREATE TABLE "public"."Action" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "sortingOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AvailableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AvailableAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Zap" ADD CONSTRAINT "Zap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Trigger" ADD CONSTRAINT "Trigger_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "public"."Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Action" ADD CONSTRAINT "Action_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "public"."Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Action" ADD CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "public"."AvailableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ZapRun" ADD CONSTRAINT "ZapRun_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "public"."Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
