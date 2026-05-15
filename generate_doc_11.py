import os
import datetime
import tkinter as tk
from tkinter import ttk, messagebox

# =============================================================
# CONFIG
# =============================================================
OUTPUT_NAME = None

ALLOWED_EXTENSIONS = {
    ".ts", ".tsx", ".mjs",
    ".json", ".sql",
    ".css",
    ".env", ".env.example" ,".java",
    ".yml", ".yaml", "dockerfile"
}

BLOCKED_FILENAMES = {
    ".gitignore",
    "package-lock.json"
}

BLOCKED_NAME_CONTAINS = {
    "eslint.config",
    "tsconfig"
}

EXCLUDED_DIRS = {
    ".mvn",
    "target",
    "node_modules",
    "dist",
    ".next",
    "test",
    "__tests__"
}

SUGGESTED_FILES = {
    "goatweddings_schema.sql",
}

# =============================================================
# FILE FILTER
# =============================================================
def is_allowed_file(filename):
    name = filename.lower()
    if name in BLOCKED_FILENAMES:
        return False
    if any(p in name for p in BLOCKED_NAME_CONTAINS):
        return False
    if name.endswith((".png", ".jpg", ".jpeg", ".svg", ".ico", ".webp")):
        return False
    return name == "dockerfile" or any(name.endswith(ext) for ext in ALLOWED_EXTENSIONS)

# =============================================================
# SCAN FILES
# =============================================================
def scan_files(root):
    result = []
    for base, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d.lower() not in EXCLUDED_DIRS]
        for f in files:
            if is_allowed_file(f):
                full = os.path.join(base, f)
                result.append(os.path.relpath(full, root).replace("\\", "/"))
    return sorted(result)

# =============================================================
# READ FILE
# =============================================================
def read_file(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        return f"[Không đọc được file: {e}]"

# =============================================================
# GENERATE DIRECTORY TREE
# =============================================================
def generate_directory_tree(selected_files):
    """
    Tạo cây thư mục từ danh sách các file được chọn.
    """
    if not selected_files:
        return ""
    
    # Xây dựng cấu trúc cây
    tree = {}
    for file_path in sorted(selected_files):
        parts = file_path.split("/")
        current = tree
        for part in parts:
            if part not in current:
                current[part] = {}
            current = current[part]
    
    # Render cây thành chuỗi
    lines = []
    
    def render_tree(node, prefix="", is_last=True, is_root=True):
        items = list(node.items())
        for i, (name, children) in enumerate(items):
            is_last_item = (i == len(items) - 1)
            
            if is_root:
                connector = ""
                new_prefix = ""
            else:
                connector = "└── " if is_last_item else "├── "
                new_prefix = prefix + ("    " if is_last_item else "│   ")
            
            # Xác định icon
            if children:  # Là thư mục
                icon = "📁"
            else:  # Là file
                icon = "📄"
            
            lines.append(f"{prefix}{connector}{icon} {name}")
            
            if children:
                render_tree(children, new_prefix, is_last_item, is_root=False)
    
    render_tree(tree)
    return "\n".join(lines)

# =============================================================
# GUI
# =============================================================
def select_files_gui(file_list):
    selected = []

    root = tk.Tk()
    root.title("Smart File Selector Pro")
    root.geometry("1500x820")

    search_var = tk.StringVar()

    # ================= SEARCH BAR =================
    top = ttk.Frame(root)
    top.pack(fill="x", padx=10, pady=6)

    ttk.Label(top, text="🔍 Smart search:").pack(side="left")
    search_entry = ttk.Entry(top, textvariable=search_var, width=75)
    search_entry.pack(side="left", padx=8)
    search_entry.focus()

    ttk.Label(
        top,
        text="multi-keyword • fuzzy • file + folder • path",
        foreground="gray"
    ).pack(side="left")

    # ================= MAIN LAYOUT =================
    main = ttk.Frame(root)
    main.pack(fill="both", expand=True)

    left = ttk.Frame(main)
    left.pack(side="left", fill="both", expand=True)

    right = ttk.Frame(main, width=450)
    right.pack(side="right", fill="y")
    right.pack_propagate(False)

    # ================= LEFT CANVAS =================
    canvas = tk.Canvas(left)
    scrollbar = ttk.Scrollbar(left, orient="vertical", command=canvas.yview)
    canvas.configure(yscrollcommand=scrollbar.set)

    frame = ttk.Frame(canvas)
    canvas.create_window((0, 0), window=frame, anchor="nw")

    frame.bind("<Configure>", lambda e: canvas.configure(scrollregion=canvas.bbox("all")))

    canvas.pack(side="left", fill="both", expand=True)
    scrollbar.pack(side="right", fill="y")

    root.bind_all("<MouseWheel>", lambda e: canvas.yview_scroll(int(-e.delta / 120), "units"))

    vars_map = {}

    # ================= SEARCH ENGINE =================
    def tokenize(text):
        return [t for t in text.lower().split() if t]

    def fuzzy_match(word, text):
        it = iter(text)
        return all(c in it for c in word)

    def score(path, keywords):
        name = os.path.basename(path.lower())
        folder = os.path.dirname(path.lower())
        full = path.lower()
        s = 0
        for kw in keywords:
            if kw in name:
                s += 6
            elif kw in folder:
                s += 4
            elif kw in full:
                s += 2
            elif fuzzy_match(kw, full):
                s += 1
        return s

    # ================= SELECTED LIST =================
    ttk.Label(right, text="📌 File đã chọn", font=("Segoe UI", 11, "bold")).pack(anchor="w", padx=10, pady=(10, 4))
    
    selected_listbox = tk.Listbox(right, height=10)
    selected_listbox.pack(fill="x", padx=10, pady=(0, 10))

    # ================= DIRECTORY TREE DISPLAY =================
    ttk.Label(right, text="🌳 Cây thư mục", font=("Segoe UI", 11, "bold")).pack(anchor="w", padx=10, pady=(10, 4))
    
    tree_frame = ttk.Frame(right)
    tree_frame.pack(fill="both", expand=True, padx=10, pady=(0, 10))
    
    tree_text = tk.Text(tree_frame, wrap="none", font=("Consolas", 9), bg="#f8f8f8", relief="flat")
    tree_scroll_y = ttk.Scrollbar(tree_frame, orient="vertical", command=tree_text.yview)
    tree_scroll_x = ttk.Scrollbar(tree_frame, orient="horizontal", command=tree_text.xview)
    tree_text.configure(yscrollcommand=tree_scroll_y.set, xscrollcommand=tree_scroll_x.set)
    
    tree_scroll_y.pack(side="right", fill="y")
    tree_scroll_x.pack(side="bottom", fill="x")
    tree_text.pack(side="left", fill="both", expand=True)

    def refresh_selected_panel():
        # Cập nhật danh sách file đã chọn
        selected_listbox.delete(0, tk.END)
        current_selected = []
        for f, v in vars_map.items():
            if v.get():
                selected_listbox.insert(tk.END, f)
                current_selected.append(f)
        
        # Cập nhật cây thư mục
        tree_text.config(state="normal")
        tree_text.delete("1.0", tk.END)
        if current_selected:
            tree_str = generate_directory_tree(current_selected)
            tree_text.insert("1.0", tree_str)
        else:
            tree_text.insert("1.0", "(Chưa chọn file nào)")
        tree_text.config(state="disabled")

    # ================= RENDER =================
    def render():
        for w in frame.winfo_children():
            w.destroy()

        keywords = tokenize(search_var.get())
        grouped = {}

        for f in file_list:
            sc = score(f, keywords) if keywords else 999
            if sc <= 0:
                continue
            folder = os.path.dirname(f) or "(root)"
            grouped.setdefault(folder, []).append((sc, f))

        for folder in sorted(grouped):
            ttk.Label(
                frame,
                text=f"📁 {folder}",
                font=("Segoe UI", 10, "bold")
            ).pack(anchor="w", padx=8, pady=(10, 2))

            for sc, f in sorted(grouped[folder], reverse=True):
                var = vars_map.setdefault(
                    f,
                    tk.BooleanVar(value=os.path.basename(f).lower() in SUGGESTED_FILES)
                )

                var.trace_add("write", lambda *_: refresh_selected_panel())

                lbl = f"[{sc}] {os.path.basename(f)}"
                chk = ttk.Checkbutton(frame, text=lbl, variable=var)
                chk.pack(anchor="w", padx=28, pady=1)

                if sc >= 8:
                    chk.configure(style="StrongMatch.TCheckbutton")
                elif sc >= 4:
                    chk.configure(style="MediumMatch.TCheckbutton")

    style = ttk.Style()
    style.configure("StrongMatch.TCheckbutton", foreground="#0a7d32")
    style.configure("MediumMatch.TCheckbutton", foreground="#1e88e5")

    render()
    search_var.trace_add("write", lambda *_: render())

    # ================= BUTTONS =================
    btns = ttk.Frame(root)
    btns.pack(fill="x", padx=10, pady=6)

    def select_all():
        for v in vars_map.values():
            v.set(True)

    def unselect_all():
        for v in vars_map.values():
            v.set(False)

    ttk.Button(btns, text="Chọn tất cả", command=select_all).pack(side="left", padx=4)
    ttk.Button(btns, text="Bỏ chọn tất cả", command=unselect_all).pack(side="left", padx=4)

    root.bind("<Control-a>", lambda e: select_all())
    root.bind("<Control-A>", lambda e: select_all())

    # ================= RIGHT PANEL - SUGGESTED FILES =================
    ttk.Label(right, text="⭐ File đề xuất", font=("Segoe UI", 11, "bold")).pack(anchor="w", padx=10, pady=6)

    suggested_frame = ttk.Frame(right)
    suggested_frame.pack(fill="x", padx=10)

    for f in file_list:
        if os.path.basename(f).lower() in SUGGESTED_FILES:
            var = vars_map.setdefault(f, tk.BooleanVar(value=True))
            var.trace_add("write", lambda *_: refresh_selected_panel())
            ttk.Checkbutton(suggested_frame, text=f, variable=var).pack(anchor="w", padx=2, pady=2)

    # Khởi tạo panel lần đầu
    refresh_selected_panel()

    # ================= CONFIRM =================
    def confirm():
        for f, v in vars_map.items():
            if v.get():
                selected.append(f)
        if not selected:
            messagebox.showwarning("Warning", "Bạn chưa chọn file nào!")
            return
        root.destroy()

    ttk.Button(root, text="Scan Selected Files", command=confirm).pack(pady=10)

    root.mainloop()
    return selected

# =============================================================
# OUTPUT
# =============================================================
def generate_output(files, root_dir):
    out = []
    out.append("================================================================================")
    out.append(f"SCAN SELECTED FILES - {len(files)} FILES")
    out.append("================================================================================\n")

    # Thêm cây thư mục vào đầu output
    out.append("--------------------------------------------------------------------------------")
    out.append("📂 DIRECTORY TREE")
    out.append("--------------------------------------------------------------------------------")
    out.append(generate_directory_tree(files))
    out.append("\n")

    for i, f in enumerate(files, 1):
        out.append("################################################################################")
        out.append(f"## FILE {i}: {os.path.basename(f)}")
        out.append(f"## Path: {f}")
        out.append("################################################################################\n")
        out.append(read_file(os.path.join(root_dir, f)))
        out.append("\n\n")

    return "\n".join(out)

# =============================================================
# MAIN
# =============================================================
def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    module = os.path.basename(root_dir)

    files = scan_files(root_dir)
    if not files:
        print("No valid files found.")
        return

    selected = select_files_gui(files)

    now = datetime.datetime.now().strftime("%Y-%m-%d_%Hh%M")
    output_file = OUTPUT_NAME or f"{module}_DOCUMENTATION_{now}.txt"

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(generate_output(selected, root_dir))

    print(f"DONE! File generated: {output_file}")

if __name__ == "__main__":
    main()