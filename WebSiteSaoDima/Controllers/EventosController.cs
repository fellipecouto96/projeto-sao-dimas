using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebSiteSaoDima.Models;

namespace WebSiteSaoDima.Controllers
{
    public class EventosController : Controller
    {
        private Trab_LabEntities db = new Trab_LabEntities();

        // GET: Eventoes
        public ActionResult Index()
        {
            var evento = db.Evento.Include(e => e.TipoEvento1).Include(e => e.Usuario);
            return View(evento.ToList());
        }

        // GET: Eventoes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Evento evento = db.Evento.Find(id);
            if (evento == null)
            {
                return HttpNotFound();
            }
            return View(evento);
        }

        // GET: Eventoes/Create
        public ActionResult Create()
        {
            ViewBag.tipoEvento = new SelectList(db.TipoEvento, "id", "nome");
            ViewBag.usuCriador = new SelectList(db.Usuario, "id", "nome");
            return View();
        }

        [HttpPost]
        public ActionResult Create(string nome, System.DateTime dataHora, int tipoEvento,string descricao, int usuCriador, HttpPostedFileBase ImageUpload)
        {
            Evento evento = new Evento();
            evento.id = 0;
            evento.nome = nome;
            evento.dataHora = dataHora;
            evento.tipoEvento = tipoEvento;
            evento.descricao = descricao;
            evento.usuCriador = usuCriador;
       

            using (var binaryReader = new BinaryReader(ImageUpload.InputStream))
                evento.imagemEvento = binaryReader.ReadBytes(ImageUpload.ContentLength);


            if (ModelState.IsValid)
            {
                db.Evento.Add(evento);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.tipoEvento = new SelectList(db.TipoEvento, "id", "nome", evento.tipoEvento);
            ViewBag.usuCriador = new SelectList(db.Usuario, "id", "nome", evento.usuCriador);
            return View(evento);
        }

        // GET: Eventoes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Evento evento = db.Evento.Find(id);
            if (evento == null)
            {
                return HttpNotFound();
            }
            ViewBag.tipoEvento = new SelectList(db.TipoEvento, "id", "nome", evento.tipoEvento);
            ViewBag.usuCriador = new SelectList(db.Usuario, "id", "nome", evento.usuCriador);
            return View(evento);
        }

        // POST: Eventoes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,nome,dataHora,tipoEvento,imagemEvento,descricao,usuCriador")] Evento evento)
        {
            var imageTypes = new string[]{
                    "image/gif",
                    "image/jpeg",
                    "image/pjpeg",
                    "image/png"
                };

            if (ModelState.IsValid)
            {
                db.Entry(evento).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.tipoEvento = new SelectList(db.TipoEvento, "id", "nome", evento.tipoEvento);
            ViewBag.usuCriador = new SelectList(db.Usuario, "id", "nome", evento.usuCriador);
            return View(evento);
        }

        // GET: Eventoes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Evento evento = db.Evento.Find(id);
            if (evento == null)
            {
                return HttpNotFound();
            }
            return View(evento);
        }

        // POST: Eventoes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Evento evento = db.Evento.Find(id);
            db.Evento.Remove(evento);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
