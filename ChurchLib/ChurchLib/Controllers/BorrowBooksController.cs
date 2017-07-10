using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ChurchLib.Models;
using ChurchLib.Models.LibraryModels;

namespace ChurchLib.Controllers
{
    public class BorrowBooksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/BorrowBooks
        public IEnumerable<BorrowBook> GetBorrowedBooks()
        {
            return db.BorrowedBooks.ToList();
        }

        // GET: api/BorrowBooks/5
        [ResponseType(typeof(BorrowBook))]
        public async Task<IHttpActionResult> GetBorrowBook(int id)
        {
            BorrowBook borrowBook = await db.BorrowedBooks.FindAsync(id);
            if (borrowBook == null)
            {
                return NotFound();
            }

            return Ok(borrowBook);
        }

        // PUT: api/BorrowBooks/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBorrowBook(int id, BorrowBook borrowBook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != borrowBook.BorrowBookID)
            {
                return BadRequest();
            }

            db.Entry(borrowBook).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BorrowBookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/BorrowBooks
        [ResponseType(typeof(BorrowBook))]
        public async Task<IHttpActionResult> PostBorrowBook(BorrowBook borrowBook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BorrowedBooks.Add(borrowBook);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BorrowBookExists(borrowBook.BorrowBookID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = borrowBook.BorrowBookID }, borrowBook);
        }

        // DELETE: api/BorrowBooks/5
        [ResponseType(typeof(BorrowBook))]
        public async Task<IHttpActionResult> DeleteBorrowBook(int id)
        {
            BorrowBook borrowBook = await db.BorrowedBooks.FindAsync(id);
            if (borrowBook == null)
            {
                return NotFound();
            }

            db.BorrowedBooks.Remove(borrowBook);
            await db.SaveChangesAsync();

            return Ok(borrowBook);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BorrowBookExists(int id)
        {
            return db.BorrowedBooks.Count(e => e.BorrowBookID == id) > 0;
        }
    }
}