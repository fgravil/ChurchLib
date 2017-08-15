namespace ChurchLib.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class m1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Books",
                c => new
                    {
                        BookID = c.Int(nullable: false, identity: true),
                        title = c.String(nullable: false, maxLength: 80),
                        author = c.String(nullable: false, maxLength: 40),
                        ISBN = c.String(nullable: false, maxLength: 13),
                        year = c.Int(nullable: false),
                        description = c.String(maxLength: 300),
                        imageUrl = c.String(),
                        Transaction_TransactionID = c.Int(),
                    })
                .PrimaryKey(t => t.BookID)
                .ForeignKey("dbo.Transactions", t => t.Transaction_TransactionID)
                .Index(t => t.Transaction_TransactionID);
            
            CreateTable(
                "dbo.Genres",
                c => new
                    {
                        GenreID = c.Int(nullable: false, identity: true),
                        name = c.String(),
                    })
                .PrimaryKey(t => t.GenreID);
            
            CreateTable(
                "dbo.Media",
                c => new
                    {
                        MediaID = c.Int(nullable: false, identity: true),
                        mediaType = c.Int(nullable: false),
                        title = c.String(nullable: false, maxLength: 80),
                        date = c.DateTime(nullable: false),
                        description = c.String(maxLength: 300),
                        Transaction_TransactionID = c.Int(),
                    })
                .PrimaryKey(t => t.MediaID)
                .ForeignKey("dbo.Transactions", t => t.Transaction_TransactionID)
                .Index(t => t.Transaction_TransactionID);
            
            CreateTable(
                "dbo.Transactions",
                c => new
                    {
                        TransactionID = c.Int(nullable: false, identity: true),
                        borrowDate = c.DateTime(nullable: false),
                        dueDate = c.DateTime(nullable: false),
                        delayPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Reader_ReaderID = c.Int(),
                    })
                .PrimaryKey(t => t.TransactionID)
                .ForeignKey("dbo.Readers", t => t.Reader_ReaderID)
                .Index(t => t.Reader_ReaderID);
            
            CreateTable(
                "dbo.Readers",
                c => new
                    {
                        ReaderID = c.Int(nullable: false, identity: true),
                        firstName = c.String(maxLength: 20),
                        lastName = c.String(maxLength: 20),
                        email = c.String(nullable: false),
                        phone = c.String(),
                    })
                .PrimaryKey(t => t.ReaderID);
            
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.UserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.Roles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        firstName = c.String(),
                        lastName = c.String(),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.UserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.UserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.GenreBooks",
                c => new
                    {
                        Genre_GenreID = c.Int(nullable: false),
                        Book_BookID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Genre_GenreID, t.Book_BookID })
                .ForeignKey("dbo.Genres", t => t.Genre_GenreID, cascadeDelete: true)
                .ForeignKey("dbo.Books", t => t.Book_BookID, cascadeDelete: true)
                .Index(t => t.Genre_GenreID)
                .Index(t => t.Book_BookID);
            
            CreateTable(
                "dbo.MediaGenres",
                c => new
                    {
                        Media_MediaID = c.Int(nullable: false),
                        Genre_GenreID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Media_MediaID, t.Genre_GenreID })
                .ForeignKey("dbo.Media", t => t.Media_MediaID, cascadeDelete: true)
                .ForeignKey("dbo.Genres", t => t.Genre_GenreID, cascadeDelete: true)
                .Index(t => t.Media_MediaID)
                .Index(t => t.Genre_GenreID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserRoles", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserLogins", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserClaims", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserRoles", "RoleId", "dbo.Roles");
            DropForeignKey("dbo.Transactions", "Reader_ReaderID", "dbo.Readers");
            DropForeignKey("dbo.Media", "Transaction_TransactionID", "dbo.Transactions");
            DropForeignKey("dbo.Books", "Transaction_TransactionID", "dbo.Transactions");
            DropForeignKey("dbo.MediaGenres", "Genre_GenreID", "dbo.Genres");
            DropForeignKey("dbo.MediaGenres", "Media_MediaID", "dbo.Media");
            DropForeignKey("dbo.GenreBooks", "Book_BookID", "dbo.Books");
            DropForeignKey("dbo.GenreBooks", "Genre_GenreID", "dbo.Genres");
            DropIndex("dbo.MediaGenres", new[] { "Genre_GenreID" });
            DropIndex("dbo.MediaGenres", new[] { "Media_MediaID" });
            DropIndex("dbo.GenreBooks", new[] { "Book_BookID" });
            DropIndex("dbo.GenreBooks", new[] { "Genre_GenreID" });
            DropIndex("dbo.UserLogins", new[] { "UserId" });
            DropIndex("dbo.UserClaims", new[] { "UserId" });
            DropIndex("dbo.Users", "UserNameIndex");
            DropIndex("dbo.UserRoles", new[] { "RoleId" });
            DropIndex("dbo.UserRoles", new[] { "UserId" });
            DropIndex("dbo.Roles", "RoleNameIndex");
            DropIndex("dbo.Transactions", new[] { "Reader_ReaderID" });
            DropIndex("dbo.Media", new[] { "Transaction_TransactionID" });
            DropIndex("dbo.Books", new[] { "Transaction_TransactionID" });
            DropTable("dbo.MediaGenres");
            DropTable("dbo.GenreBooks");
            DropTable("dbo.UserLogins");
            DropTable("dbo.UserClaims");
            DropTable("dbo.Users");
            DropTable("dbo.UserRoles");
            DropTable("dbo.Roles");
            DropTable("dbo.Readers");
            DropTable("dbo.Transactions");
            DropTable("dbo.Media");
            DropTable("dbo.Genres");
            DropTable("dbo.Books");
        }
    }
}
