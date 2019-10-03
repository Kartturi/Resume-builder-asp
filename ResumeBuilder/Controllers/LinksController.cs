using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResumeBuilder.Models;

namespace ResumeBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinksController : ControllerBase
    {
        private readonly ResumeBuilderContext _context;

        public LinksController(ResumeBuilderContext context)
        {
            _context = context;
        }

        // GET: api/Links
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Links>>> GetLinks()
        {
            return await _context.Links.ToListAsync();
        }

        // GET: api/Links/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Links>> GetLinks(int id)
        {
            var links = await _context.Links.FindAsync(id);

            if (links == null)
            {
                return NotFound();
            }

            return links;
        }

        // PUT: api/Links/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLinks(int id, Links links)
        {
            if (id != links.LinkId)
            {
                return BadRequest();
            }

            _context.Entry(links).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LinksExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Links
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Links>> PostLinks(Links links)
        {
            _context.Links.Add(links);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLinks", new { id = links.LinkId }, links);
        }

        // DELETE: api/Links/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Links>> DeleteLinks(int id)
        {
            var links = await _context.Links.FindAsync(id);
            if (links == null)
            {
                return NotFound();
            }

            _context.Links.Remove(links);
            await _context.SaveChangesAsync();

            return links;
        }

        private bool LinksExists(int id)
        {
            return _context.Links.Any(e => e.LinkId == id);
        }
    }
}
