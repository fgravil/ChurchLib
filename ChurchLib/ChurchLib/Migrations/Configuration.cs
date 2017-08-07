namespace ChurchLib.Migrations
{
    using ChurchLib.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Microsoft.AspNet.Identity;
    using ChurchLib.Models.LibraryModels;

    internal sealed class Configuration : DbMigrationsConfiguration<ChurchLib.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(ChurchLib.Models.ApplicationDbContext context)
        {
            var passwordHash = new PasswordHasher();

            User[] librarians = new User[]
            {
                new User() {
                    firstName = "Lorrithza",
                    lastName ="Nelson",
                    Email = "leogglorri@gmail.com",
                    UserName = "leogglorri@gmail.com",
                    PhoneNumber = "4078836970",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    PasswordHash = passwordHash.HashPassword("Secret@123")
                },
                new User()
                {
                    firstName = "Lovenarly",
                    lastName = "Gravil",
                    Email = "lovenarlyg@yahoo.com",
                    UserName = "lovenarlyg@yahoo.com",
                    PhoneNumber = "4076686079",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    PasswordHash = passwordHash.HashPassword("Secret@123")
                }
            };

            foreach(var librarian in librarians)
            {
                if(context.Users.Count(u => u.Email == librarian.Email) == 0)
                {
                    context.Users.AddOrUpdate(librarian);
                }
            }

            var Readers = new Reader[]
            {
                new Reader(){firstName = "Fred", lastName = "Gravil", email = "fgravil18@gmail.com", phone = "4075749375"},
                new Reader(){firstName = "Ashland", lastName = "Gravil", email = "ash18@gmail.com", phone = "4076686079"},
                new Reader(){firstName = "John", lastName = "Doe", email = "jdoe@gmail.com", phone = "4075749375"},
                new Reader(){firstName = "Jane", lastName = "Neal", email = "jn@gmail.com", phone = "4076686079"},
                new Reader(){firstName = "Bob", lastName = "Smean", email = "bs@gmail.com", phone = "4075749375"},
                new Reader(){firstName = "Nick", lastName = "Don", email = "nd@gmail.com", phone = "4076686079"},

            };

            foreach (var reader in Readers)
            {
                if (context.Readers.Count(r => r.email == reader.email) == 0)
                {
                    context.Readers.AddOrUpdate(reader);
                }
            }


            var Genres = new Genre[]
            {
                new Genre(){name = "Religion"},
                new Genre(){name = "Romance"},
                new Genre(){name = "Fantasy"},
                new Genre(){name = "History"},
                new Genre(){name = "Literature"},
                new Genre(){name = "Fiction"},
                new Genre(){name = "Non-Fiction"},
                new Genre(){name = "Historical"},
                new Genre(){name = "Mystery"},
            };

            foreach (var genre in Genres)
            {
                if (context.Genres.Count(g => g.name == genre.name) == 0)
                {
                    context.Genres.AddOrUpdate(genre);
                }
            }

            var Books = new Book[]
            {
                new Book()
                {
                    title = "The Chronicles of Persia",
                    author = "C.F Lewis",
                    ISBN = "9780266238500",
                    description = "Journeys to the end of the world, fantastic creatures, and epic battles ",
                    year = 1960,
                    imageUrl = "",
                },
                new Book()
                {
                    title = "Mere Christians",
                    author = "C.A Lewis",
                    ISBN = "971006422380",
                    description = "lorem ipsum do lorm as posin",
                    year = 1945,
                    Transaction = null,
                    imageUrl = ""

                },
                new Book()
                {
                    title = "The Book",
                    author = "Jane Doe",
                    ISBN = "980066238700",
                    description = "Journeys to the end of the world, fantastic creatures, and epic battles ",
                    year = 1978,
                    Transaction = null,
                    imageUrl = "",

                },
                new Book()
                {
                    title = "The Diary of a young girl",
                    author = "Anne Frank",
                    ISBN = "978001423500",
                    description = "lorem ipsum do lorm as posin",
                    year = 1940,
                    Transaction = null,
                    imageUrl = ""

                },
                new Book()
                {
                    title = "Do Let",
                    author = "Paul Young",
                    ISBN = "978006637710",
                    description = "lorem ipsum do lorm as posin",
                    year = 1985,
                    Transaction = null,
                },
                new Book()
                {
                    title = "Lorem Ipsum",
                    author = "Rick Warren",
                    ISBN = "970063238400",
                    description = "Journeys to the end of the world, fantastic creatures, and epic battles ",
                    year = 1999,
                    Transaction = null,
                    imageUrl = ""

                },

            };

            foreach (var book in Books)
            {
                if (context.Books.Count(b => b.ISBN == book.ISBN) == 0)
                {
                    context.Books.AddOrUpdate(book);
                }
            }

            //var Transactions = new BorrowBook[]
            //{
            //    new BorrowBook(){BorrowBookID = 7, borrowDate = new DateTime(2017,5,18), dueDate = new DateTime(2017,5,30), ReaderID = 1}
            //};

            //foreach (var book in Transactions)
            //{
            //    if (context.Transactions.Count(b => b.BorrowBookID == b.BorrowBookID) == 0)
            //    {
            //        context.Transactions.AddOrUpdate(book);
            //    }
            //}

            base.Seed(context);
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
