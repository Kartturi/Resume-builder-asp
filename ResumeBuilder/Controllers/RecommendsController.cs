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
    public class RecommendsController : ControllerBase
    {
        private readonly ResumeBuilderContext _context;

        public RecommendsController(ResumeBuilderContext context)
        {
            _context = context;
        }

        // GET: api/Recommends
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recommends>>> GetRecommends()
        {
            return await _context.Recommends.ToListAsync();
        }

        // GET: api/Recommends/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recommends>> GetRecommends(int id)
        {
            var recommends = await _context.Recommends.FindAsync(id);

            if (recommends == null)
            {
                return NotFound();
            }

            return recommends;
        }

        // PUT: api/Recommends/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEducation(int id, Recommends recommends)
        {
            int resumeId = id;
            int recommendsId = recommends.RecommendsId;
            var recomm = _context.Recommends.First(l => l.RecommendsId == recommendsId);

            recomm.NameRecommends = recommends.NameRecommends;
            recomm.PhoneRecommends = recommends.PhoneRecommends;
            recomm.Email = recommends.Email;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException e)
            {
                Console.WriteLine(e);
            }


            return NoContent();
        }

        // POST: api/Recommends/44
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("{id}")]
        public async Task<ActionResult<Recommends>> PostEducation(int id, Recommends recommends)
        {
            _context.Recommends.Add(recommends);

            await _context.SaveChangesAsync();

            var newRecommendsData = await _context.Recommends.Where(l => l.ResumeId == id).ToListAsync();

            return Ok(newRecommendsData);
        }

        // DELETE: api/Recommends/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Recommends>> DeleteRecommends(int id)
        {
            var recommendsData = await _context.Recommends.FindAsync(id);
            if (recommendsData == null)
            {
                return NotFound();
            }
            int resumeId = recommendsData.ResumeId;
            _context.Recommends.Remove(recommendsData);
            await _context.SaveChangesAsync();

            return Ok(await _context.Recommends.Where(l => l.ResumeId == resumeId).ToListAsync());
        }

        private bool RecommendsExists(int id)
        {
            return _context.Recommends.Any(e => e.RecommendsId == id);
        }
    }
}
