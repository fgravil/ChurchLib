namespace ChurchLib.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class m2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Media",
                c => new
                    {
                        MediaID = c.Int(nullable: false, identity: true),
                        mediaType = c.Int(nullable: false),
                        name = c.String(nullable: false, maxLength: 80),
                        description = c.String(maxLength: 100),
                    })
                .PrimaryKey(t => t.MediaID);
            
            AlterColumn("dbo.Books", "title", c => c.String(nullable: false, maxLength: 80));
            AlterColumn("dbo.Books", "author", c => c.String(nullable: false, maxLength: 40));
            AlterColumn("dbo.Books", "ISBN", c => c.String(nullable: false));
            AlterColumn("dbo.Books", "description", c => c.String(maxLength: 100));
            AlterColumn("dbo.Readers", "firstName", c => c.String(maxLength: 20));
            AlterColumn("dbo.Readers", "lastName", c => c.String(maxLength: 20));
            AlterColumn("dbo.Readers", "email", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Readers", "email", c => c.String());
            AlterColumn("dbo.Readers", "lastName", c => c.String());
            AlterColumn("dbo.Readers", "firstName", c => c.String());
            AlterColumn("dbo.Books", "description", c => c.String());
            AlterColumn("dbo.Books", "ISBN", c => c.String());
            AlterColumn("dbo.Books", "author", c => c.String());
            AlterColumn("dbo.Books", "title", c => c.String(nullable: false));
            DropTable("dbo.Media");
        }
    }
}
