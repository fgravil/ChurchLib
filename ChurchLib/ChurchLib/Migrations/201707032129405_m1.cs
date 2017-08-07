namespace ChurchLib.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class m1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BorrowBooks", "BorrowBookID", "dbo.Books");
            DropForeignKey("dbo.Delays", "DelayID", "dbo.BorrowBooks");
            DropForeignKey("dbo.BorrowBooks", "ReaderID", "dbo.Readers");
            DropIndex("dbo.BorrowBooks", new[] { "BorrowBookID" });
            DropIndex("dbo.BorrowBooks", new[] { "ReaderID" });
            DropIndex("dbo.Delays", new[] { "DelayID" });
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
            
            AddColumn("dbo.Books", "Transaction_TransactionID", c => c.Int());
            AddColumn("dbo.Genres", "name", c => c.String());
            AddColumn("dbo.Media", "title", c => c.String(nullable: false, maxLength: 80));
            AddColumn("dbo.Media", "date", c => c.DateTime(nullable: false));
            AddColumn("dbo.Media", "Transaction_TransactionID", c => c.Int());
            CreateIndex("dbo.Books", "Transaction_TransactionID");
            CreateIndex("dbo.Media", "Transaction_TransactionID");
            AddForeignKey("dbo.Books", "Transaction_TransactionID", "dbo.Transactions", "TransactionID");
            AddForeignKey("dbo.Media", "Transaction_TransactionID", "dbo.Transactions", "TransactionID");
            DropColumn("dbo.Genres", "genre");
            DropColumn("dbo.Media", "name");
            DropTable("dbo.BorrowBooks");
            DropTable("dbo.Delays");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Delays",
                c => new
                    {
                        DelayID = c.Int(nullable: false),
                        delayDays = c.Int(nullable: false),
                        money = c.Decimal(nullable: false, precision: 18, scale: 2),
                        memo = c.String(),
                    })
                .PrimaryKey(t => t.DelayID);
            
            CreateTable(
                "dbo.BorrowBooks",
                c => new
                    {
                        BorrowBookID = c.Int(nullable: false),
                        ReaderID = c.Int(nullable: false),
                        borrowDate = c.DateTime(nullable: false),
                        dueDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.BorrowBookID);
            
            AddColumn("dbo.Media", "name", c => c.String(nullable: false, maxLength: 80));
            AddColumn("dbo.Genres", "genre", c => c.String());
            DropForeignKey("dbo.Transactions", "Reader_ReaderID", "dbo.Readers");
            DropForeignKey("dbo.Media", "Transaction_TransactionID", "dbo.Transactions");
            DropForeignKey("dbo.Books", "Transaction_TransactionID", "dbo.Transactions");
            DropForeignKey("dbo.MediaGenres", "Genre_GenreID", "dbo.Genres");
            DropForeignKey("dbo.MediaGenres", "Media_MediaID", "dbo.Media");
            DropIndex("dbo.MediaGenres", new[] { "Genre_GenreID" });
            DropIndex("dbo.MediaGenres", new[] { "Media_MediaID" });
            DropIndex("dbo.Transactions", new[] { "Reader_ReaderID" });
            DropIndex("dbo.Media", new[] { "Transaction_TransactionID" });
            DropIndex("dbo.Books", new[] { "Transaction_TransactionID" });
            DropColumn("dbo.Media", "Transaction_TransactionID");
            DropColumn("dbo.Media", "date");
            DropColumn("dbo.Media", "title");
            DropColumn("dbo.Genres", "name");
            DropColumn("dbo.Books", "Transaction_TransactionID");
            DropTable("dbo.MediaGenres");
            DropTable("dbo.Transactions");
            CreateIndex("dbo.Delays", "DelayID");
            CreateIndex("dbo.BorrowBooks", "ReaderID");
            CreateIndex("dbo.BorrowBooks", "BorrowBookID");
            AddForeignKey("dbo.BorrowBooks", "ReaderID", "dbo.Readers", "ReaderID", cascadeDelete: true);
            AddForeignKey("dbo.Delays", "DelayID", "dbo.BorrowBooks", "BorrowBookID");
            AddForeignKey("dbo.BorrowBooks", "BorrowBookID", "dbo.Books", "BookID");
        }
    }
}
