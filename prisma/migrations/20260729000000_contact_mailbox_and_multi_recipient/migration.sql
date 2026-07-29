-- AlterTable
ALTER TABLE "SiteSettings" ALTER COLUMN "adminEmail" SET DEFAULT 'contact@redrocleaning.com, redrocleaning@gmail.com',
ALTER COLUMN "contactEmail" SET DEFAULT 'contact@redrocleaning.com';

-- Move the existing singleton row onto the new mailbox. Only rows still holding
-- the previous defaults are touched, so a value set in the admin UI survives.
UPDATE "SiteSettings"
SET "adminEmail" = 'contact@redrocleaning.com, redrocleaning@gmail.com'
WHERE "adminEmail" = 'redrocleaning@gmail.com';

UPDATE "SiteSettings"
SET "contactEmail" = 'contact@redrocleaning.com'
WHERE "contactEmail" = 'redrocleaning@gmail.com';
