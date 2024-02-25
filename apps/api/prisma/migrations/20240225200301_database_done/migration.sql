-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `room` VARCHAR(191) NOT NULL,
    `building` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `voiceMail` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `creditCard` VARCHAR(191) NOT NULL,
    `dateEntered` DATETIME(3) NOT NULL,
    `dateUpdated` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `deleted` BOOLEAN NOT NULL,
    `notes` VARCHAR(191) NULL,
    `creditCardTypeID` INTEGER NULL,
    `cardExpirationID` INTEGER NULL,
    `billingAddressId` INTEGER NULL,
    `shippingAddressId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `typeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AddressType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreditCardType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CardExpiration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shipper` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `allowed` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `orderNumber` INTEGER NOT NULL,
    `paymentId` INTEGER NOT NULL,
    `orderDate` DATETIME(3) NOT NULL,
    `shipDate` DATETIME(3) NOT NULL,
    `requiredDate` DATETIME(3) NOT NULL,
    `shipperId` INTEGER NOT NULL,
    `freight` VARCHAR(191) NOT NULL,
    `salesTax` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `transactStatus` BOOLEAN NOT NULL,
    `errLocation` VARCHAR(191) NOT NULL,
    `errMsg` VARCHAR(191) NOT NULL,
    `fulfilled` BOOLEAN NOT NULL,
    `deleted` BOOLEAN NOT NULL,
    `paid` BOOLEAN NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `discount` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `fulfilled` BOOLEAN NOT NULL,
    `shipDate` DATETIME(3) NOT NULL,
    `billDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sku` VARCHAR(191) NOT NULL,
    `vendorProductId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `supplierId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `quantityPerUnit` INTEGER NOT NULL,
    `unitPrice` INTEGER NOT NULL,
    `msrp` INTEGER NOT NULL,
    `availableSize` INTEGER NOT NULL,
    `availableColors` INTEGER NOT NULL,
    `size` INTEGER NOT NULL,
    `color` INTEGER NOT NULL,
    `discount` INTEGER NOT NULL,
    `unitWeight` INTEGER NOT NULL,
    `unitInStock` BOOLEAN NOT NULL,
    `unitsOnOrder` INTEGER NOT NULL,
    `reorderLevel` INTEGER NOT NULL,
    `productAvailable` BOOLEAN NOT NULL,
    `discountAvailable` INTEGER NOT NULL,
    `currentOrder` INTEGER NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `ranking` DOUBLE NOT NULL,
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(191) NOT NULL,
    `contactName` VARCHAR(191) NOT NULL,
    `contactTitle` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `fax` VARCHAR(191) NOT NULL,
    `homePage` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `paymentMethod` VARCHAR(191) NOT NULL,
    `discountType` VARCHAR(191) NOT NULL,
    `typeGoods` VARCHAR(191) NOT NULL,
    `discountAvailable` INTEGER NOT NULL,
    `currentOrder` INTEGER NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `ranking` DOUBLE NOT NULL,
    `notes` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL,
    `deleted` BOOLEAN NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL,
    `dateUpdated` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `customer_creditCardType` FOREIGN KEY (`creditCardTypeID`) REFERENCES `CreditCardType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `customer_cardExpiration` FOREIGN KEY (`cardExpirationID`) REFERENCES `CardExpiration`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `AddressType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_shipperId_fkey` FOREIGN KEY (`shipperId`) REFERENCES `Shipper`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
