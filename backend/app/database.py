import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        host="127.0.0.1",
        database="timetable",
        user="postgres",
        password="Fdryo520agF"
    )
    return conn

def fetch_groups(conn):
    cur = conn.cursor()
    cur.execute("SELECT number, degree, year, institute, student_group_id FROM student_group")
    rows = cur.fetchall()
    cur.close()
    return rows

def fetch_teachers(conn):
    cur = conn.cursor()
    cur.execute("SELECT name, teacher_id FROM teacher")
    rows = cur.fetchall()
    cur.close()
    return rows

def fetch_classroms(conn):
    cur = conn.cursor()
    cur.execute("SELECT corpus, number, class_id FROM classroom")
    rows = cur.fetchall()
    cur.close()
    return rows

def fetch_subjects(conn):
    cur = conn.cursor()
    cur.execute("SELECT name, subject_id FROM subject")
    rows = cur.fetchall()
    cur.close()
    return rows

def fetch_week(conn):
    cur = conn.cursor()

    cur.execute("""SELECT DISTINCT 
    TO_CHAR(date_trunc('week', datetime), 'DD.MM.YY') || ' - ' || 
    TO_CHAR((date_trunc('week', datetime) + INTERVAL '5 day'), 'DD.MM.YY') AS week,
    EXTRACT(YEAR FROM date_trunc('week', datetime)) AS year,
    EXTRACT(MONTH FROM date_trunc('week', datetime)) AS month,
    EXTRACT(DAY FROM date_trunc('week', datetime)) AS day
FROM learn_day
ORDER BY year, month, day;
""")
    rows = cur.fetchall()
    cur.close()
    return rows

def fetch_teacher_timetable(conn, teacher_id, start_date, end_date):
    cur = conn.cursor()
    cur.execute('''
        SELECT l.number, s.name, ld.datetime
        FROM lesson l
        JOIN learn_day ld ON l.date_id = ld.learn_day_id
        JOIN subject s ON l.subject_id = s.subject_id
        WHERE l.teacher_id = %s AND ld.datetime BETWEEN %s AND %s
        ORDER BY l.number
    ''', (teacher_id, start_date, end_date))
    rows = cur.fetchall()
    cur.close()
    return rows

def fetch_id_by_teacher_timetable(conn, teacher_id, start_date, end_date):
    cur = conn.cursor()
    cur.execute('''
        SELECT l.number, l.lesson_id, ld.datetime
        FROM lesson l
        JOIN learn_day ld ON l.date_id = ld.learn_day_id
        JOIN subject s ON l.subject_id = s.subject_id
        WHERE l.teacher_id = %s AND ld.datetime BETWEEN %s AND %s
        ORDER BY l.number
    ''', (teacher_id, start_date, end_date))
    rows = cur.fetchall()
    cur.close()
    return rows

def fetch_group_timetable(conn, group_id, start_date, end_date):
    cur = conn.cursor()
    cur.execute('''
        SELECT l.number, s.name, ld.datetime
        FROM lesson l
        JOIN learn_day ld ON l.date_id = ld.learn_day_id
        JOIN subject s ON l.subject_id = s.subject_id
        JOIN lesson_group lg ON l.lesson_id = lg.lesson_id
        WHERE lg.group_id = %s AND ld.datetime BETWEEN %s AND %s
        ORDER BY l.number
    ''', (group_id, start_date, end_date))
    rows = cur.fetchall()
    cur.close()
    return rows

def fetch_id_by_group_timetable(conn, group_id, start_date, end_date):
    cur = conn.cursor()
    cur.execute('''
        SELECT l.number, l.lesson_id, ld.datetime
        FROM lesson l
        JOIN learn_day ld ON l.date_id = ld.learn_day_id
        JOIN subject s ON l.subject_id = s.subject_id
        JOIN lesson_group lg ON l.lesson_id = lg.lesson_id
        WHERE lg.group_id = %s AND ld.datetime BETWEEN %s AND %s
        ORDER BY l.number
    ''', (group_id, start_date, end_date))
    rows = cur.fetchall()
    cur.close()
    return rows

def fetch_classroom_timetable(conn, classroom_id, start_date, end_date):
    cur = conn.cursor()
    cur.execute('''
        SELECT l.number, s.name, ld.datetime
        FROM lesson l
        JOIN learn_day ld ON l.date_id = ld.learn_day_id
        JOIN subject s ON l.subject_id = s.subject_id
        WHERE l.class_id = %s AND ld.datetime BETWEEN %s AND %s
        ORDER BY l.number
    ''', (classroom_id, start_date, end_date))
    rows = cur.fetchall()
    cur.close()
    return rows

def fetch_id_by_classroom_timetable(conn, classroom_id, start_date, end_date):
    cur = conn.cursor()
    cur.execute('''
        SELECT l.number, l.lesson_id, ld.datetime
        FROM lesson l
        JOIN learn_day ld ON l.date_id = ld.learn_day_id
        JOIN subject s ON l.subject_id = s.subject_id
        WHERE l.class_id = %s AND ld.datetime BETWEEN %s AND %s
        ORDER BY l.number
    ''', (classroom_id, start_date, end_date))
    rows = cur.fetchall()
    cur.close()
    return rows

def get_lesson(conn, lesson_id):
    cur = conn.cursor()
    cur.execute('''
        SELECT l.type, t.name, c.corpus, c.number, sg.student_group_id, s.name
        FROM lesson l
        JOIN teacher t ON l.teacher_id = t.teacher_id
        JOIN classroom c ON l.class_id = c.class_id
        JOIN lesson_group lg ON l.lesson_id = lg.lesson_id
        JOIN student_group sg ON lg.group_id = sg.student_group_id
        JOIN subject s ON l.subject_id = s.subject_id
        WHERE l.lesson_id = %s''', (lesson_id,))
    rows = cur.fetchall()
    cur.close()
    return rows

def get_group(conn, group_id):
    cur = conn.cursor()
    cur.execute('''SELECT number, degree, year, institute FROM student_group WHERE student_group.student_group_id = %s''', str(group_id))
    rows = cur.fetchall()
    cur.close()
    return rows

def put_lesson_update(conn, class_id, number, lesson_id):
    cur = conn.cursor()
    cur.execute(
        "UPDATE lesson SET class_id = %s, number = %s WHERE lesson_id = %s",
        (class_id, number, lesson_id)
    )
    conn.commit()
    cur.close()

def delete_lesson_by_id(conn, lesson_id):
    cur = conn.cursor()
    cur.execute("DELETE FROM lesson_group WHERE lesson_id = %s", (lesson_id,))
    cur.execute("DELETE FROM lesson WHERE lesson_id = %s", (lesson_id,))
    rows_deleted = cur.rowcount
    conn.commit()
    cur.close()
    return rows_deleted

def create_lesson(conn, date_id, teacher_id, subject_id, class_id, number, type, group_id):
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO lesson (date_id, teacher_id, subject_id, class_id, number, type) VALUES (%s, %s, %s, %s, %s, %s) RETURNING lesson_id",
        (date_id, teacher_id, subject_id, class_id, number, type)
    )
    lesson_id = cur.fetchone()[0]
    cur.execute(
        "INSERT INTO lesson_group (lesson_id, group_id) VALUES (%s, %s)",
        (lesson_id, group_id)
    )
    conn.commit()
    cur.close()

def get_learn_day(conn, date):
    cur = conn.cursor()
    cur.execute(
        "SELECT learn_day_id FROM learn_day WHERE datetime = %s",
        (date,)
    )
    learn_day_id = cur.fetchone()
    conn.commit()
    cur.close()
    return learn_day_id
