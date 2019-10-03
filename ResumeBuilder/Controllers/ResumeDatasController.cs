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
    public class ResumeDatasController : ControllerBase
    {
        private readonly ResumeBuilderContext _context;

        public ResumeDatasController(ResumeBuilderContext context)
        {
            _context = context;
        }

        [HttpGet("test")]
        public IActionResult testGet()
        {
            var resumes = _context.ResumeData.Where(s => s.ResumeId == 30)
                .Include(s => s.Links)
                .Include(w => w.WorkData)
                .ToList();
             
            return Ok(resumes);
            
        }


        // GET: api/ResumeDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResumeData>>> GetResumeData()
        {
            

            return await _context.ResumeData.ToListAsync();
        }

        // GET: api/ResumeDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ResumeData>> GetResumeData(int id)
        {
            var resumeData = await _context.ResumeData.FindAsync(id);

            if (resumeData == null)
            {
                return NotFound();
            }

            return resumeData;
        }

        // PUT: api/ResumeDatas/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResumeData(int id, ResumeData resumeData)
        {
            if (id != resumeData.ResumeId)
            {
                return BadRequest();
            }

            _context.Entry(resumeData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResumeDataExists(id))
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

        // POST: api/ResumeDatas
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ResumeData>> PostResumeData(ResumeData resumeData)
        {
            _context.ResumeData.Add(resumeData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResumeData", new { id = resumeData.ResumeId }, resumeData);
        }

        // DELETE: api/ResumeDatas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ResumeData>> DeleteResumeData(int id)
        {
            var resumeData = await _context.ResumeData.FindAsync(id);
            if (resumeData == null)
            {
                return NotFound();
            }

            _context.ResumeData.Remove(resumeData);
            await _context.SaveChangesAsync();

            return resumeData;
        }

        private bool ResumeDataExists(int id)
        {
            return _context.ResumeData.Any(e => e.ResumeId == id);
        }
    }
}
