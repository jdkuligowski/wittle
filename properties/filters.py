import django_filters
from .models import Property



class PropertyFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='value', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='value', lookup_expr='lte')
    min_bedrooms = django_filters.NumberFilter(field_name='bedrooms', lookup_expr='gte')
    max_bedrooms = django_filters.NumberFilter(field_name='bedrooms', lookup_expr='lte')
    channel = django_filters.CharFilter(field_name='channel', lookup_expr='exact')
    type = django_filters.CharFilter(field_name='type', lookup_expr='exact')

    class Meta:
        model = Property
        fields = ['min_price', 'max_price', 'min_bedrooms',  'max_bedrooms', 'channel', 'type']



class WittlePropertyFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='value', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='value', lookup_expr='lte')
    min_bedrooms = django_filters.NumberFilter(field_name='bedrooms', lookup_expr='gte')
    max_bedrooms = django_filters.NumberFilter(field_name='bedrooms', lookup_expr='lte')
    channel = django_filters.CharFilter(field_name='channel', lookup_expr='exact')
    type = django_filters.CharFilter(field_name='type', lookup_expr='exact')
    # restaurants_dist = django_filters.NumberFilter(field_name='restaurants__walking_time_mins', lookup_expr='lte')
    # pubs_dist = django_filters.NumberFilter(field_name='bars__walking_time_mins', lookup_expr='lte')
    # takeaways_dist = django_filters.NumberFilter(field_name='takeaways__walking_time_mins', lookup_expr='lte')
    # cafes_dist = django_filters.NumberFilter(field_name='cafes__walking_time_mins', lookup_expr='lte')
    # gyms_dist = django_filters.NumberFilter(field_name='gyms__walking_time_mins', lookup_expr='lte')
    # supermarkets_dist = django_filters.NumberFilter(field_name='supermarkets__walking_time_mins', lookup_expr='lte')
    # parks_dist = django_filters.NumberFilter(field_name='parks__walking_time_mins', lookup_expr='lte')
    # primaries_dist = django_filters.NumberFilter(field_name='primaries__walking_time_mins', lookup_expr='lte')
    # secondaries_dist = django_filters.NumberFilter(field_name='secondaries__walking_time_mins', lookup_expr='lte')
    # colleges_dist = django_filters.NumberFilter(field_name='colleges__walking_time_mins', lookup_expr='lte')
    # tubes_dist = django_filters.NumberFilter(field_name='tubes__walking_time_mins', lookup_expr='lte')
    # trains_dist = django_filters.NumberFilter(field_name='trains__walking_time_mins', lookup_expr='lte')

    class Meta:
        model = Property
        fields = ['min_price', 'max_price', 'min_bedrooms',  'max_bedrooms', 'channel', 'type']
                  # 'restaurants_dist']
                  #  'pubs_dist', 'takeaways_dist', 'cafes_dist', 'gyms_dist', 'supermarkets_dist', 
                  # 'parks_dist', 'primaries_dist', 'secondaries_dist', 'colleges_dist', 'tubes_dist', 'trains_dist' ]