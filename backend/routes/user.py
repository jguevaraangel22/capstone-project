
from fastapi import APIRouter, Depends, Body, HTTPException, status
from backend.common.common import AUTH_USER_COLLECTION
from backend.common.types import RequestWithDB
from backend.data.model.base_response import BaseResponse
from backend.data.model.user import UserOut, UserUpdate
from backend.routes.middlewares import authenticated_user
from backend.data.model import UserOut, UserToken
from typing import Optional

router = APIRouter()


@router.get("/me/",
            response_model=Optional[UserOut],
            response_model_exclude_none=True,
            )
def read_users_me(request: RequestWithDB, current_user: UserToken = Depends(authenticated_user)):
    # find user
    user = request.app.database[AUTH_USER_COLLECTION].find_one(
        {"email": current_user.email
         })

    if user is None:
        return None

    return user


@router.put("/update/",
            response_description="Updates currently logged in user",
            response_model=BaseResponse[UserUpdate],
            response_model_exclude_none=True,
            )
def update_user_info(
        request: RequestWithDB, userfields: UserUpdate = Body(...),
        current_user: UserToken = Depends(authenticated_user)):

    non_noneuserfields = {k: v for k,
                          v in userfields.dict().items() if v is not None}
    if len(non_noneuserfields) >= 1:
        update_result = request.app.database[AUTH_USER_COLLECTION].update_one(
            {"email": current_user.email}, {"$set": non_noneuserfields}
        )
        if update_result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"User with logged in email not found")

    existing_updated = request.app.database[AUTH_USER_COLLECTION].find_one({
                                                                           "email": current_user.email})
    if existing_updated is not None:
        return BaseResponse(success=True, payload=existing_updated, msg="Updated user successfully!")
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"User with logged in email not found")
