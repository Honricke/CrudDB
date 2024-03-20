from .connect import operator, session
from type.types import ItemType, InsertType
import json
from timeit import default_timer as timer
from datetime import datetime, timezone


def get_names():
    def serialize_datetime(obj):
        if isinstance(obj, datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        raise TypeError("Tipo de objeto não serializável")

    sqlCode = "SELECT * FROM items WHERE remove_date IS NULL"

    operator.execute(sqlCode)
    response = json.dumps(operator.fetchall(), default=serialize_datetime)
    newRes = json.loads(response)

    return newRes


def insert_item(item: InsertType):
    sqlCode = "INSERT INTO items(name,qtd,add_date) VALUES(%s,%s,%s) RETURNING id"

    operator.execute(
        sqlCode,
        (
            item.name,
            item.qtd,
            datetime.now(),
        ),
    )
    session.commit()

    newId = operator.fetchone()["id"]
    return {"id": newId, "name": item.name, "qtd": item.qtd}


def remove_item(item: ItemType):
    sqlCode = "UPDATE items SET remove_date = %s WHERE id = %s"

    operator.execute(sqlCode, (datetime.now(), item.id))
    session.commit()

    return item


def update_name(item: ItemType):
    print(item)
    sqlCode = "UPDATE items SET name = %s WHERE id = %s "
    data = [f"{item.name}", f"{item.id}"]

    operator.execute(sqlCode, data)
    session.commit()

    return item


def update_qtd(item: ItemType):
    print(item)
    sqlCode = "UPDATE items SET qtd = %s WHERE id = %s"
    data = [f"{item.qtd}", f"{item.id}"]

    operator.execute(sqlCode, data)
    session.commit()

    return item
