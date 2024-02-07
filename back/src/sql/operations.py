from .connect import operator, session
from type.types import ItemType, RequestType, UpdateType
import json
from timeit import default_timer as timer


def get_names():
    start = timer()

    operator.execute("SELECT * FROM items")
    response = json.dumps(operator.fetchall())
    newRes = json.loads(response)

    end = timer()
    print(end - start)

    return newRes


def insert_name(item: RequestType):
    sqlCode = "INSERT INTO items(name) VALUES(%s) RETURNING id"
    data = [f"{item.name}"]
    operator.execute(sqlCode, data)
    session.commit()

    newId = operator.fetchone()["id"]
    return {"id": newId, "name": item.name}


def remove_name(item: ItemType):
    sqlCode = "DELETE FROM items WHERE id = %s"
    data = [f"{item.id}"]
    operator.execute(sqlCode, data)
    session.commit()

    return item


def update_name(item: UpdateType):
    sqlCode = "UPDATE items SET name = %s WHERE id = %s "
    data = [f"{item.newName}",f"{item.id}"]
    operator.execute(sqlCode,data)
    session.commit

    return {
        "id": item.id,
        "name": item.newName
    }


# def get_names():
#     start = timer()
#     operator.execute("SELECT * FROM items")
#     response = operator.fetchall()

#     data = [dict(row) for row in response]
#     end = timer()
#     print(end - start)
#     return data
