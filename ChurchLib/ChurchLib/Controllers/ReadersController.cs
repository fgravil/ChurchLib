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
    public class ReadersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Readers
        public IEnumerable<Reader> GetReaders()
        {
            return db.Readers.ToList();
        }

        // GET: api/Readers/5
        [ResponseType(typeof(Reader))]
        public async Task<IHttpActionResult> GetReader(int id)
        {
            Reader reader = await db.Readers.FindAsync(id);
            if (reader == null)
            {
                return NotFound();
            }

            return Ok(reader);
        }

        // PUT: api/Readers/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutReader(int id, Reader reader)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reader.ReaderID)
            {
                return BadRequest();
            }

            db.Entry(reader).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReaderExists(id))
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

        // POST: api/Readers
        [HttpPost]
        [ResponseType(typeof(Reader))]
        public async Task<IHttpActionResult> PostReader(Reader reader)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Readers.Add(reader);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = reader.ReaderID }, reader);
        }

        // DELETE: api/Readers/5
        [ResponseType(typeof(Reader))]
        public async Task<IHttpActionResult> DeleteReader(int id)
        {
            Reader reader = await db.Readers.FindAsync(id);
            if (reader == null)
            {
                return NotFound();
            }

            db.Readers.Remove(reader);
            await db.SaveChangesAsync();

            return Ok(reader);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReaderExists(int id)
        {
            return db.Readers.Count(e => e.ReaderID == id) > 0;
        }
    }
}