import psycopg2
from psycopg2.extras import RealDictCursor

session = psycopg2.connect("dbname=cruddb user=postgres password=87835060_Hen",cursor_factory=RealDictCursor)

operator = session.cursor()