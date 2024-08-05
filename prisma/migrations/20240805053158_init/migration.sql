-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_messagesId_fkey";

-- CreateTable
CREATE TABLE "_ConversationToMessages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationToMessages_AB_unique" ON "_ConversationToMessages"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationToMessages_B_index" ON "_ConversationToMessages"("B");

-- AddForeignKey
ALTER TABLE "_ConversationToMessages" ADD CONSTRAINT "_ConversationToMessages_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToMessages" ADD CONSTRAINT "_ConversationToMessages_B_fkey" FOREIGN KEY ("B") REFERENCES "Messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
