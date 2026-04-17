-- CreateTable
CREATE TABLE "PostStats" (
    "slug" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PostStats_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "PostLike" (
    "id" TEXT NOT NULL,
    "postSlug" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedPost" (
    "id" TEXT NOT NULL,
    "postSlug" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostLike_postSlug_sessionId_key" ON "PostLike"("postSlug", "sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedPost_postSlug_userId_key" ON "SavedPost"("postSlug", "userId");

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postSlug_fkey" FOREIGN KEY ("postSlug") REFERENCES "PostStats"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPost" ADD CONSTRAINT "SavedPost_postSlug_fkey" FOREIGN KEY ("postSlug") REFERENCES "PostStats"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
