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
            int resumeId = id;
            int linkId = links.LinkId;
            var link = _context.Links.First(l => l.LinkId == linkId);
            
            link.Name = links.Name;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LinksExists(linkId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            var linkList = await _context.Links.Where(l => l.ResumeId == resumeId).ToListAsync();
            return Ok(linkList);
        }

        // POST: api/Links
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("{id}")]
        public async Task<ActionResult<Links>> PostLinks(int id, Links links)
        {
            _context.Links.Add(links);
            await _context.SaveChangesAsync();

            var linkData = await _context.Links.Where(l => l.ResumeId == id).ToListAsync();

            return Ok(linkData);
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
            int resumeId = links.ResumeId;
            _context.Links.Remove(links);
            await _context.SaveChangesAsync();

            return Ok(await _context.Links.Where(l => l.ResumeId == resumeId).ToListAsync());
        }

        private bool LinksExists(int id)
        {
            return _context.Links.Any(e => e.LinkId == id);
        }
    }
}
