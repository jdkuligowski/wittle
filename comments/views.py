from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import CommentSerializer
from .models import Comment


# SQL / Django:
# Add new comment -> POST /comments/

# View that allows us to post a new review
class CommentListView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['owner'] = request.user.id
        print('request ->', request.data)
        print(request.user.id)
        comment_to_add = CommentSerializer(data=request.data)
        try:
            # print('in the try')
            comment_to_add.is_valid()
            # print(comment_to_add.is_valid())
            comment_to_add.save()
            return Response(comment_to_add.data, status.HTTP_201_CREATED)
        except ValidationError:
            print('validation error')
            return Response(comment_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print('exception error')
            # print(comment_to_add.is_valid())
            # print(comment_to_add.errors)
            print(e)
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)
        

# Endpoint: /comments/:id
class CommentDetailView(APIView):
    # permission_classes = (IsAuthenticated, )

    def get_comment(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise NotFound("Review not found")

    def delete(self, request, pk):
        comment_to_delete = self.get_comment(pk)
        if comment_to_delete.owner != request.user:
            print('WE CANT DELETE RECORD')
            raise PermissionDenied()
        comment_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)