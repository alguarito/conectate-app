---
description: Subir cambios al repositorio de GitHub (git add, commit, push)
---

# Deploy — Subir cambios a GitHub

Ejecutar estos pasos cuando el usuario pida subir cambios al repositorio o cuando se terminen de hacer modificaciones al proyecto.

// turbo-all

1. Agregar todos los archivos modificados:
```bash
cd /Users/alvarocardenasorozco/Desktop/CONECTATE && git add .
```

2. Verificar que `cloudflare-worker.js` NO esté incluido:
```bash
cd /Users/alvarocardenasorozco/Desktop/CONECTATE && git diff --cached --name-only | grep -c "cloudflare-worker" && echo "⚠️ ALERTA: cloudflare-worker.js está incluido!" || echo "✅ Seguro: cloudflare-worker.js NO se sube"
```

3. Crear el commit con un mensaje descriptivo de los cambios realizados:
```bash
cd /Users/alvarocardenasorozco/Desktop/CONECTATE && git commit -m "MENSAJE_DESCRIPTIVO"
```

4. Subir al repositorio:
```bash
cd /Users/alvarocardenasorozco/Desktop/CONECTATE && git push
```

5. Confirmar al usuario que los cambios se subieron correctamente y compartir el enlace: https://github.com/alguarito/conectate-app
