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
    public class EducationsController : ControllerBase
    {
        private readonly ResumeBuilderContext _context;

        public EducationsController(ResumeBuilderContext context)
        {
            _context = context;
        }

        // GET: api/Educations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Education>>> GetEducation()
        {
            return await _context.Education.ToListAsync();
        }

        // GET: api/Educations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Education>> GetEducation(int id)
        {
            var education = await _context.Education.FindAsync(id);

            if (education == null)
            {
                return NotFound();
            }

            return education;
        }

        // PUT: api/Educations/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEducation(int id, Education education)
        {
            int resumeId = id;
            int educationId = education.EducationId;
            var educations = _context.Education.First(l => l.EducationId == educationId);

            educations.School = education.School;
            educations.Time = education.Time;
            educations.Description = education.Description;

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

        // POST: api/Educations
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("{id}")]
        public async Task<ActionResult<Education>> PostEducation(int id, Education education)
        {
            _context.Education.Add(education);

            await _context.SaveChangesAsync();

            var newEducationData = await _context.Education.Where(l => l.ResumeId == id).ToListAsync();

            return Ok(newEducationData);
        }

        // DELETE: api/Educations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Education>> DeleteEducation(int id)
        {
            var educationData = await _context.Education.FindAsync(id);
            if (educationData == null)
            {
                return NotFound();
            }
            int resumeId = educationData.ResumeId;
            _context.Education.Remove(educationData);
            await _context.SaveChangesAsync();

            return Ok(await _context.Education.Where(l => l.ResumeId == resumeId).ToListAsync());
        }

        private bool EducationExists(int id)
        {
            return _context.Education.Any(e => e.EducationId == id);
        }
    }
}
