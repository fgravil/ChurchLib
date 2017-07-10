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
                        title = c.String(nullable: false),
                        author = c.String(),
                        ISBN = c.String(),
                        year = c.Int(nullable: false),
                        description = c.String(),
                        imageUrl = c.String(),
                    })
                .PrimaryKey(t => t.BookID);
            
            CreateTable(
                "dbo.BorrowBooks",
                c => new
                    {
                        BorrowBookID = c.Int(nullable: false),
                        ReaderID = c.Int(nullable: false),
                        borrowDate = c.DateTime(nullable: false),
                        dueDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.BorrowBookID)
                .ForeignKey("dbo.Books", t => t.BorrowBookID)
                .ForeignKey("dbo.Readers", t => t.ReaderID, cascadeDelete: true)
                .Index(t => t.BorrowBookID)
                .Index(t => t.ReaderID);
            
            CreateTable(
                "dbo.Delays",
                c => new
                    {
                        DelayID = c.Int(nullable: false),
                        delayDays = c.Int(nullable: false),
                        money = c.Decimal(nullable: false, precision: 18, scale: 2),
                        memo = c.String(),
                    })
                .PrimaryKey(t => t.DelayID)
                .ForeignKey("dbo.BorrowBooks", t => t.DelayID)
                .Index(t => t.DelayID);
            
            CreateTable(
                "dbo.Readers",
                c => new
                    {
                        ReaderID = c.Int(nullable: false, identity: true),
                        firstName = c.String(),
                        lastName = c.String(),
                        email = c.String(),
                        phone = c.String(),
                    })
                .PrimaryKey(t => t.ReaderID);
            
            CreateTable(
                "dbo.Genres",
                c => new
                    {
                        GenreID = c.Int(nullable: false, identity: true),
                        genre = c.String(),
                    })
                .PrimaryKey(t => t.GenreID);
            
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
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserRoles", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserLogins", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserClaims", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserRoles", "RoleId", "dbo.Roles");
            DropForeignKey("dbo.GenreBooks", "Book_BookID", "dbo.Books");
            DropForeignKey("dbo.GenreBooks", "Genre_GenreID", "dbo.Genres");
            DropForeignKey("dbo.BorrowBooks", "ReaderID", "dbo.Readers");
            DropForeignKey("dbo.Delays", "DelayID", "dbo.BorrowBooks");
            DropForeignKey("dbo.BorrowBooks", "BorrowBookID", "dbo.Books");
            DropIndex("dbo.GenreBooks", new[] { "Book_BookID" });
            DropIndex("dbo.GenreBooks", new[] { "Genre_GenreID" });
            DropIndex("dbo.UserLogins", new[] { "UserId" });
            DropIndex("dbo.UserClaims", new[] { "UserId" });
            DropIndex("dbo.Users", "UserNameIndex");
            DropIndex("dbo.UserRoles", new[] { "RoleId" });
            DropIndex("dbo.UserRoles", new[] { "UserId" });
            DropIndex("dbo.Roles", "RoleNameIndex");
            DropIndex("dbo.Delays", new[] { "DelayID" });
            DropIndex("dbo.BorrowBooks", new[] { "ReaderID" });
            DropIndex("dbo.BorrowBooks", new[] { "BorrowBookID" });
            DropTable("dbo.GenreBooks");
            DropTable("dbo.UserLogins");
            DropTable("dbo.UserClaims");
            DropTable("dbo.Users");
            DropTable("dbo.UserRoles");
            DropTable("dbo.Roles");
            DropTable("dbo.Genres");
            DropTable("dbo.Readers");
            DropTable("dbo.Delays");
            DropTable("dbo.BorrowBooks");
            DropTable("dbo.Books");
        }
    }
}
