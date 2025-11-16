-- CreateTable
CREATE TABLE "user_web_push_subscription" (
    "endpoint" TEXT NOT NULL,
    "keys" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_web_push_subscription_pkey" PRIMARY KEY ("endpoint")
);

-- CreateIndex
CREATE INDEX "user_web_push_subscription_userId_idx" ON "user_web_push_subscription"("userId");

-- AddForeignKey
ALTER TABLE "user_web_push_subscription" ADD CONSTRAINT "user_web_push_subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
