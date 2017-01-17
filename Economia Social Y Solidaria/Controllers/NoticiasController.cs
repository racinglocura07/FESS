﻿using Economia_Social_Y_Solidaria.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Economia_Social_Y_Solidaria.Controllers
{
     
    public class NoticiasController : Controller
    {
        //
        // GET: /Noticias/

        public ActionResult Portada()
        {
            TanoNEEntities ctx = new TanoNEEntities();

            ViewBag.mostrar = false;
            Vecinos vecino = ctx.Vecinos.FirstOrDefault(a => a.correo == User.Identity.Name);
            if (vecino != null && (vecino.idVecino == 76 || vecino.idVecino == 77))
                ViewBag.mostrar = true;

                List<Noticias> lista = ctx.Noticias.Take(10).OrderBy(a => a.fecha).ToList();
            return View(lista);
        }

        [Authorize]
        public JsonResult Lista()
        {
            TanoNEEntities ctx = new TanoNEEntities();

            List<Noticias> lista = ctx.Noticias.OrderBy(a => a.fecha).ToList();
            return Json(new { Result = "OK", Records = lista });
        }

        [Authorize]
        public JsonResult Crear(Noticias noticia)
        {
            TanoNEEntities ctx = new TanoNEEntities();

            ctx.Noticias.Add(noticia);
            ctx.SaveChanges();
            return Json(new { Result = "OK", Record = noticia });
        }

        [Authorize]
        public JsonResult Editar(Noticias noticia)
        {
            TanoNEEntities ctx = new TanoNEEntities();

            Noticias editar = ctx.Noticias.FirstOrDefault(a => a.idNoticia == noticia.idNoticia);
            editar.titulo = noticia.titulo;
            editar.copete = noticia.copete;
            editar.link = noticia.link;
            editar.imagen = noticia.imagen;
            editar.categoria = noticia.categoria;
            editar.tags = noticia.tags;
            editar.autor = noticia.autor;
            editar.fecha = noticia.fecha;

            ctx.SaveChanges();
            return Json(new { Result = "OK", Record = noticia });
        }

        [Authorize]
        public JsonResult Borrar(int idNoticia)
        {
            TanoNEEntities ctx = new TanoNEEntities();

            ctx.Noticias.Remove(ctx.Noticias.FirstOrDefault(a => a.idNoticia == idNoticia));
            ctx.SaveChanges();
            return Json(new { Result = "OK" });
        }

        [Authorize]
        public ActionResult Cargar()
        {
            TanoNEEntities ctx = new TanoNEEntities();

            return View();
        }



    }
}