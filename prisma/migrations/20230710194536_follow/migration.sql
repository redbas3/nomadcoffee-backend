-- CreateTable
CREATE TABLE "_FolowRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FolowRelation_AB_unique" ON "_FolowRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_FolowRelation_B_index" ON "_FolowRelation"("B");

-- AddForeignKey
ALTER TABLE "_FolowRelation" ADD CONSTRAINT "_FolowRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FolowRelation" ADD CONSTRAINT "_FolowRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
